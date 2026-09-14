const { SlashCommandBuilder, ApplicationIntegrationType, MessageFlags, InteractionContextType, PermissionFlagsBits } = require("discord.js")

module.exports = {
	command: new SlashCommandBuilder()
		.setName("guide")
		.setDescription("Staff guide: every command and what it does.")
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	execute: async (interaction, client) => {
		await interaction.deferReply({ flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }).catch(() => {})

		const { container, files } = require("messages/guide")
		await interaction.editReply({ components: [container], files, flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] })
	},
}
