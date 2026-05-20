const { SlashCommandBuilder, ApplicationIntegrationType, MessageFlags, InteractionContextType, PermissionFlagsBits } = require("discord.js")

module.exports = {
	args: (interaction) => {
		return interaction.options.getString("id")
	},

	command: new SlashCommandBuilder()
		.setName("refresh-games")
		.setDescription("Manually refresh the game list for the /restock command.")
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	execute: async (interaction, client, id) => {
		client.emit("refreshGames")

		await interaction.reply({ content: `Task asked, should be done quickly !`, flags: MessageFlags.Ephemeral }).catch(() => {})
	},
}
