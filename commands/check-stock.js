const {
	SlashCommandBuilder,
	ApplicationIntegrationType,
	MessageFlags,
	InteractionContextType,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ActionRowBuilder,
	ModalBuilder,
	LabelBuilder,
	CheckboxBuilder,
	TextInputBuilder,
	TextInputStyle,
	ComponentType,
	AttachmentBuilder,
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} = require("discord.js")

const getRestockMessage = require("functions/getRestockMessage")

module.exports = {
	args: (interaction) => {
		return interaction.options.getString("game")
	},

	command: new SlashCommandBuilder()
		.setName("check-stock")
		.setDescription("Sends the current remaining stock for a game. (Todo: change the command name)")
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel)
		.addStringOption((option) => option.setName("game").setDescription("The game to check the stock of.").setRequired(true).setAutocomplete(true)),
	// .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	/**
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction
	 * @param {import('discord.js').Client} client
	 */
	execute: async (interaction, client, game) => {
		interaction.reply({
			content: game.value,
			flags: MessageFlags.Ephemeral,
		})
	},
}
