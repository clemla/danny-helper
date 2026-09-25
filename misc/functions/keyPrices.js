// Global Steam key prices come from AllKeyShop, which tags every offer with its
// region. Official stores (what IsThereAnyDeal/CheapShark list) often sell
// region-locked keys, and CheapShark also blocks server IPs.
const AKS = "https://www.allkeyshop.com"
const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36" }

// Buying here doesn't give you a key you can send to someone.
const NOT_KEYS = ["Steam"]

const cache = new Map()
const products = new Map()

// Long timeout on purpose: the button gives up after 15s, but a slow lookup keeps
// going and fills the cache, so trying again a minute later is instant.
async function get(url, type = "json") {
	const res = await fetch(url, { headers, signal: AbortSignal.timeout(60000) })
	if (!res.ok) throw new Error(`${new URL(url).host} answered ${res.status}`)
	return type === "json" ? res.json() : res.text()
}

async function steamInfo(appid) {
	const data = await get(`https://store.steampowered.com/api/appdetails?appids=${appid}&cc=us&l=english`).catch(() => null)
	// Steam sometimes files the reply under another id, so take whatever entry it sent.
	const entry = data && (data[appid] || Object.values(data)[0])
	if (!entry?.success) return null
	const d = entry.data
	return {
		name: d.name,
		image: d.header_image,
		released: d.release_date?.date || null,
		year: Number(d.release_date?.date?.match(/\d{4}/)?.[0]) || null,
		denuvo: /denuvo/i.test(d.drm_notice || ""),
	}
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "")

async function findProduct(name) {
	if (products.has(name)) return products.get(name)
	const url = `${AKS}/api/latest/vaks.php?action=CatalogMultiplatformSearchV1&currency=usd&locale=en_US&search_name=${encodeURIComponent(name)}`
	const pc = ((await get(url)).products || []).filter((p) => p.operating_systems?.includes("pc") && p.link)
	const want = norm(name)
	const found = pc.find((p) => norm(p.name) === want) || pc.find((p) => norm(p.name).startsWith(want) || want.startsWith(norm(p.name))) || null
	if (found) products.set(name, found)
	return found
}

// The game page embeds every offer as `var gamePageTrans = {...}`, followed by more script.
function readOffers(html) {
	const start = html.indexOf("{", html.indexOf("var gamePageTrans"))
	if (start < 0) return null
	let depth = 0
	let inString = false
	for (let i = start; i < html.length; i++) {
		const c = html[i]
		if (inString) {
			if (c === "\\") i++
			else if (c === '"') inString = false
		} else if (c === '"') inString = true
		else if (c === "{") depth++
		else if (c === "}" && --depth === 0) return JSON.parse(html.slice(start, i + 1))
	}
	return null
}

async function findDeals(name) {
	const product = await findProduct(name)
	if (!product) return []
	const t = readOffers(await get(product.link, "text"))
	if (!t?.prices) return []

	const seen = new Set()
	return t.prices
		.filter((o) => t.regions?.[o.region]?.region_name === "GLOBAL" && !o.account && o.activationPlatform === "steam" && o.dispo == 1)
		.filter((o) => !NOT_KEYS.includes(o.merchantName))
		.sort((a, b) => a.price - b.price)
		.filter((o) => {
			const key = `${o.merchant}:${o.edition}`
			return !seen.has(key) && seen.add(key)
		})
		.map((o) => ({
			store: o.merchantName,
			price: Number(o.price),
			edition: t.editions?.[o.edition]?.name || null,
			code: o.voucher_code || null,
			url: `${AKS}/redirection/offer/usd/${o.id}?locale=en_US&merchant=${o.merchant}`,
		}))
}

async function lookup(appid) {
	const hit = cache.get(appid)
	if (hit?.pending) return hit.pending
	if (hit && Date.now() - hit.at < 10 * 60 * 1000) return hit.result

	// Share one in-flight lookup, so clicking again while it's slow doesn't pile up requests.
	const pending = (async () => {
		const game = await steamInfo(appid)
		const deals = game ? await findDeals(game.name) : []
		return { appid, game, deals }
	})()
	cache.set(appid, { pending })
	try {
		const result = await pending
		cache.set(appid, { at: Date.now(), result })
		return result
	} catch (err) {
		cache.delete(appid)
		throw err
	}
}

module.exports = { lookup }
