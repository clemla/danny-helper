const { MessageFlags } = require("discord.js")

module.exports = {
	name: "interactionCreate",

	/**
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction
	 * @param {import('discord.js').Client} client
	 */
	execute: async (interaction, client) => {
		setTimeout(() => {
			interaction
				.reply({
					content: `Oops sorry, something went wrong. Please try again.`,
					flags: MessageFlags.Ephemeral,
				})
				.catch(() => {})
		}, 2.5 * 1000)
	},
}
