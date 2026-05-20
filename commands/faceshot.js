const {
	SlashCommandBuilder,
	ApplicationIntegrationType,
	MessageFlags,
	InteractionContextType,
	PermissionFlagsBits,
	AttachmentBuilder,
} = require("discord.js")

module.exports = {
	args: (interaction) => {
		return [interaction.options.getUser("user"), interaction.options.getBoolean("decoration") || true]
	},

	command: new SlashCommandBuilder()
		.setName("faceshot")
		.setDescription("Take a picture of the pfp+decoration (Gif+Png).")
		.addUserOption((option) => option.setName("user").setDescription("The user").setRequired(true))
		.addBooleanOption((option) => option.setName("decoration").setDescription("Include the avatar decoration"))
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel),

	/**
	 * @param {import('discord.js').User} user
	 */

	execute: async (interaction, client, user, deco) => {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral }).catch(() => {})

		const decoId = user.avatarDecorationData?.skuId
		// const decoUrl = decoId ? `https://cdn.discordapp.com/media/v1/collectibles-shop/${decoId}/animated` : null
		const decoUrl = user.avatarDecorationURL({ size: 4096 })
		const avatarUrl = user.displayAvatarURL({ size: 4096 })

		await interaction.editReply({ content: `Faceshot of <@${user.id}>`, flags: MessageFlags.Ephemeral, files: [attachment] }).catch(() => {})
	},
}
