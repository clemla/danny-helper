const { writeFileSync } = require("fs")
const { ActivityType } = require("discord.js")

module.exports = {
	name: "refreshGames",

	/**
	 * @param {import('discord.js').Client} client
	 */

	execute: async (client) => {
		const res = await fetch(process.env.quota_endpoint, {
			headers: {
				"User-Agent": "Danny-helper bunjs",
			},
		})
		const data = await res.json()
		const list = Object.fromEntries(
			Object.entries(data)
				// Remove non-ascii (tm or copyright things mostly)
				.map(([id, v]) => [id, v.game_name.replace(/[^\x00-\x7F]/g, "").trim()]),
		)

		// prettier-ignore
		for (const id of Object.values(list).map((v) => v.match(/App\s*(\d+)/)?.[1]).filter(Boolean)) {
			const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`)
			const game = await res.json()

			list[id] = game[id].data.name
		}

		writeFileSync("misc/toWatch/game_list.json", JSON.stringify(list, null, 2))
	},
}
