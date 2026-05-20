const {
	SlashCommandBuilder,
	ApplicationIntegrationType,
	MessageFlags,
	InteractionContextType,
	PermissionFlagsBits,
	SlashCommandSubcommandBuilder,
} = require("discord.js")

const command = new SlashCommandBuilder()
	.setName("messages")
	.setDescription("To send specific messages")
	.setIntegrationTypes(ApplicationIntegrationType.UserInstall, ApplicationIntegrationType.GuildInstall)
	.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel)

const data = [
	{
		name: "apex",
		description: "To send the Apex donation message.",
		options: ["Requirement", "Benefits", "Guide"],
	},
	{
		name: "help",
		description: "To send the quick help message.",
		options: ["Code missing", "Code location", "Anti-Tamper", "Game files"],
	},
	{
		name: "req",
		description: "To send the requirements message.",
		options: ["WUB", "Downloaded", "Specs", "Hypervisor"],
	},
	{
		name: "plugin",
		description: "To send the Steam plugin guide.",
		options: ["Installation", "Usage", "Side links"],
	},
	{
		name: "staff",
		description: "To send the staff guide message.",
	},
]
data.forEach((cmd) => {
	const sub = new SlashCommandSubcommandBuilder().setName(cmd.name).setDescription(cmd.description)
	if (cmd.options) {
		sub.addStringOption((option) =>
			option
				.setName("section")
				.setDescription("The specific section")
				.addChoices(cmd.options.map((opt) => ({ name: opt, value: opt.toLowerCase().replace(/[\s-]/g, "_") }))),
		)
	}

	command.addSubcommand(sub)
})

module.exports = {
	args: (interaction) => {
		return interaction.options.getString("section")
	},

	command,

	execute: async (interaction, client, section) => {
		// Special whitelist for .gg/luatools
		const whitelisted = ["1484213202177753088", "1408847186266951781", "1408702655517429791"]

		// Verify blacklisted channels (Bypass if MANAGE_MESSAGES permission)
		const blacklisted = [
			"1492970016662880347",
			"1470048649366208718",
			"1466114598301204676",
			"1466116525848133807",
			"1469730951000228034",
			"1484177015497166878",
		]
		//prettier-ignore
		if (
			((interaction.guildId == "1464130182364270696" && !whitelisted.includes(interaction.channelId)) ||
			(blacklisted.includes(interaction.channelId)))
			&& !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
		) {
			return interaction.reply({
				content: `You cannot use this command in this channel.\nHead to${interaction.guildId == "1464130182364270696" ? " <#1469730908054491136> or" : ""} any commands/help specific channel.`,
				flags: MessageFlags.Ephemeral,
			})
		}

		const sub = interaction.options.getSubcommand()
		const isGuild = interaction.authorizingIntegrationOwners[ApplicationIntegrationType.GuildInstall] !== undefined

		await interaction.deferReply({ flags: MessageFlags[isGuild ? "Ephemeral" : "IsComponentsV2"] }).catch(() => {})

		let { container, files, specifics } = require(`messages/${sub}`)
		if (section) {
			container = specifics[section].container
			files = specifics[section].files
		}

		if (isGuild) {
			const channel = await client.channels.fetch(interaction.channelId)
			await channel?.send({ components: [container], files, flags: MessageFlags.IsComponentsV2, allowedMentions: { parse: [] } })

			await interaction.editReply({ content: "Message sent in the channel." })
		} else {
			await interaction.editReply({ components: [container], files, flags: MessageFlags.IsComponentsV2, allowedMentions: { parse: [] } })
		}
	},
}
