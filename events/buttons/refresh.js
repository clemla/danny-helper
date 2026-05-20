const { MessageFlags, ComponentType, PermissionFlagsBits } = require("discord.js")
const getRestockMessage = require("functions/getRestockMessage")

module.exports = {
	name: "interactionCreate",

	/**
	 * @param {import('discord.js').ButtonInteraction} interaction
	 * @param {import('discord.js').Client} client
	 */
	execute: async (interaction, client) => {
		if (!interaction.isButton()) return
		if (!interaction.customId.startsWith("refresh-")) return

		await interaction.deferReply({ flags: MessageFlags.Ephemeral }).catch(() => {})

		const timeLeft = 5 * 60 * 1000 - Date.now() + (interaction.message.editedTimestamp ?? 0)
		if (timeLeft > 0 && interaction.member.permissions.has(PermissionFlagsBits.ManageMessages))
			return interaction.editReply({ content: `Refresh again <t:${Math.floor((Date.now() + timeLeft) / 1000)}:R>`, flags: MessageFlags.Ephemeral })

		const games = []
		const quantities = {}
		interaction.customId
			.replace("refresh-", "")
			.split(".")
			.forEach((pair) => {
				g = parseInt(pair.slice(0, -2), 36)
				games.push(g)
				quantities[g] = parseInt(pair.slice(-2), 36)
			})

		await interaction.message.edit({ components: [await getRestockMessage({ games, data: { quantities } })] }).catch(() => {})

		await interaction.deleteReply()
	},
}
