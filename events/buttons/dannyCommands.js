const { MessageFlags } = require("discord.js")

module.exports = {
	name: "interactionCreate",

	execute: async (interaction, client) => {
		if (!interaction.isButton()) return
		if (!interaction.customId.startsWith("dcmd-")) return

		await interaction.deferReply({ flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }).catch(() => {})

		const id = interaction.customId.slice(5)

		let { container, files } = require(`messages/commands/${id}`)
		await interaction.editReply({ components: [container], files, flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] })
	},
}
