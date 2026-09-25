const CHEAPSHARK = "https://www.cheapshark.com/api/1.0"
const ITAD = "https://api.isthereanydeal.com"
const ITAD_KEY = process.env.itad_key || "a18369ec8c2f95b5f9f435689e6e203c5cecb4a7"
const headers = { "User-Agent": "DannyHelper/1.0 (LuaTools Discord bot)" }

// Stores that don't hand you a Steam key you can send to someone.
const NOT_KEYS = ["Steam", "GOG", "Epic Games Store"]

const cache = new Map()
let stores = null

async function getJson(url, options = {}) {
	const res = await fetch(url, { ...options, headers: { ...headers, ...options.headers }, signal: AbortSignal.timeout(15000) })
	if (!res.ok) {
		const body = await res.text().catch(() => "")
		throw new Error(`${new URL(url).host} answered ${res.status} ${body.slice(0, 150)}`)
	}
	return res.json()
}

async function steamInfo(appid) {
	const data = await getJson(`https://store.steampowered.com/api/appdetails?appids=${appid}&cc=us&l=english`).catch(() => null)
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

// IsThereAnyDeal is built for servers. CheapShark rate limits hosting IPs hard
// (429 "API misuse"), so it only works as a fallback from a home connection.
async function itadDeals(appid, key) {
	const found = await getJson(`${ITAD}/games/lookup/v1?key=${key}&appid=${appid}`)
	if (!found?.found || !found.game?.id) return []
	const prices = await getJson(`${ITAD}/games/prices/v3?key=${key}&country=US`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify([found.game.id]),
	})
	return (prices?.[0]?.deals || [])
		// Only offers ITAD tags as Steam keys. Untagged ones (Newegg, Steam itself) are skipped.
		.filter((d) => !NOT_KEYS.includes(d.shop?.name) && (d.drm || []).some((x) => x.name === "Steam"))
		.map((d) => ({
			store: d.shop.name,
			price: Number(d.price?.amount),
			retail: Number(d.regular?.amount),
			url: d.url,
		}))
}

async function cheapsharkDeals(appid) {
	const games = await getJson(`${CHEAPSHARK}/games?steamAppID=${appid}`)
	if (!games.length) return []
	if (!stores) {
		const list = await getJson(`${CHEAPSHARK}/stores`)
		stores = Object.fromEntries(list.map((s) => [s.storeID, s.storeName]))
	}
	const info = await getJson(`${CHEAPSHARK}/games?id=${games[0].gameID}`)
	return info.deals
		.map((d) => ({
			store: stores[d.storeID] || `Store ${d.storeID}`,
			price: Number(d.price),
			retail: Number(d.retailPrice),
			url: `https://www.cheapshark.com/redirect?dealID=${d.dealID}`,
		}))
		.filter((d) => !NOT_KEYS.includes(d.store))
}

async function findDeals(appid) {
	try {
		return await itadDeals(appid, ITAD_KEY)
	} catch (err) {
		console.error("keyPrices: IsThereAnyDeal failed, trying CheapShark.", err.message)
	}
	return cheapsharkDeals(appid)
}

async function lookup(appid) {
	const hit = cache.get(appid)
	if (hit && Date.now() - hit.at < 10 * 60 * 1000) return hit.result

	const [game, deals] = await Promise.all([steamInfo(appid), findDeals(appid)])
	deals.sort((a, b) => a.price - b.price)
	const result = { appid, game, deals }
	cache.set(appid, { at: Date.now(), result })
	return result
}

module.exports = { lookup }
