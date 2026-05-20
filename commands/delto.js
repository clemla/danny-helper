const { SlashCommandBuilder, ApplicationIntegrationType, MessageFlags, InteractionContextType, PermissionFlagsBits } = require("discord.js")

module.exports = {
	args: (interaction) => {
		return interaction.options.getString("id")
	},

	command: new SlashCommandBuilder()
		.setName("delto")
		.setDescription("Delete messages until a certain message is reached.")
		.addStringOption((option) => option.setName("id").setDescription("The message id").setRequired(true))
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	execute: async (interaction, client, id) => {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral }).catch(() => {})

		const channel = await client.channels.fetch(interaction.channelId)
		const messages = await channel.messages.fetch({ after: id, limit: 100 })

		const res = await channel.bulkDelete(messages.size, true).catch(() => {})

		await interaction.editReply({ content: `Done, deleted ${res.size} messages.`, flags: MessageFlags.Ephemeral }).catch(() => {})
	},
}
