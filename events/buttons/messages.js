const { MessageFlags } = require("discord.js")

module.exports = {
	name: "interactionCreate",

	/**
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction
	 * @param {import('discord.js').Client} client
	 */
	execute: async (interaction, client) => {
		if (!interaction.isButton()) return
		if (!interaction.customId.startsWith("messages-")) return

		await interaction.deferReply({ flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }).catch(() => {})

		let { container, files } = require(`messages/${interaction.customId.replace("messages-", "")}`)
		await interaction.editReply({ components: [container], files, flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] })
	},
}
