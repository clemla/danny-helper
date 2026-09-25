const API = "https://www.cheapshark.com/api/1.0"
const headers = { "User-Agent": "DannyHelper/1.0 (LuaTools Discord bot)" }

// Stores that don't hand you a Steam key you can send to someone.
const NOT_KEYS = ["Steam", "GOG", "Epic Games Store"]

const cache = new Map()
let stores = null

async function getJson(url) {
	const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000) })
	if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`)
	return res.json()
}

async function getStores() {
	if (stores) return stores
	const list = await getJson(`${API}/stores`)
	stores = Object.fromEntries(list.map((s) => [s.storeID, s.storeName]))
	return stores
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

async function findDeals(appid) {
	const games = await getJson(`${API}/games?steamAppID=${appid}`)
	if (!games.length) return []
	const [names, info] = await Promise.all([getStores(), getJson(`${API}/games?id=${games[0].gameID}`)])
	return info.deals
		.map((d) => ({
			store: names[d.storeID] || `Store ${d.storeID}`,
			price: Number(d.price),
			retail: Number(d.retailPrice),
			url: `https://www.cheapshark.com/redirect?dealID=${d.dealID}`,
		}))
		.filter((d) => !NOT_KEYS.includes(d.store))
		.sort((a, b) => a.price - b.price)
}

async function lookup(appid) {
	const hit = cache.get(appid)
	if (hit && Date.now() - hit.at < 10 * 60 * 1000) return hit.result

	const [game, deals] = await Promise.all([steamInfo(appid), findDeals(appid)])
	const result = { appid, game, deals }
	cache.set(appid, { at: Date.now(), result })
	return result
}

module.exports = { lookup }
