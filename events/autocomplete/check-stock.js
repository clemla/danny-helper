const { writeFileSync } = require("fs")
const { ActivityType } = require("discord.js")

module.exports = {
	name: "interactionCreate",

	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').AutocompleteInteraction} interaction
	 */

	execute: async (client, interaction) => {
		if (!interaction.isAutocomplete()) return
		const list = require("misc/toWatch/game_list.json")
		const games = Object.keys(list)
			.map((g) => `${list[g]} (${g})`)
			.sort()

		const focusedValue = interaction.options.getFocused()
		const filtered = games.filter((g) => g.toLowerCase().startsWith(focusedValue.toLowerCase())).slice(0, 25) // max 25 options

		await interaction.respond(
			filtered.map((f) => {
				const [, name, id] = f.match(/^(.*) \((\d+)\)$/)
				return { name, value: id }
			}),
		)
	},
}
