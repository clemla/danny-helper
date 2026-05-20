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
	command: new SlashCommandBuilder()
		.setName("restock")
		.setDescription("Sends the timestamps for the restocks of games.")
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	/**
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction
	 * @param {import('discord.js').Client} client
	 */
	execute: async (interaction, client) => {
		const list = require("misc/game_list.json")
		const chunkSize = 20
		const chunks = []
		const entries = Object.entries(list).sort(([, name1], [, name2]) => name1.localeCompare(name2))

		for (let i = 0; i < entries.length; i += chunkSize) {
			chunks.push(
				entries.slice(i, i + chunkSize).map(([id, game_name]) => ({
					label: game_name,
					value: id,
				})),
			)
		}

		const timeout = 20 // in mins

		await interaction.deferReply({ flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }).catch(() => {})

		const drops = chunks.map((chunk, index) =>
			new ActionRowBuilder().setComponents(
				new StringSelectMenuBuilder()
					.setMaxValues(chunk.length)
					.setMinValues(0)
					.setCustomId(`restock_names_${index}`)
					.addOptions(chunk.map((game) => new StringSelectMenuOptionBuilder().setLabel(game.label).setValue(game.value))),
			),
		)

		const color = [125, 249, 255]

		const container = new ContainerBuilder().setAccentColor(color)
		const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
		const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

		const NamesLines = ["# 🎮 Restock game selection\n### :one: Start by selecting the wanted games"]
		const NamesSec = new SectionBuilder()
			.addTextDisplayComponents(new TextDisplayBuilder().setContent(NamesLines.join("\n")))
			.setThumbnailAccessory(
				new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
			)

		const QuantityLines = ["### :two: Then set the quantity"]
		const QuantitySec = new SectionBuilder()
			.addTextDisplayComponents(new TextDisplayBuilder().setContent(QuantityLines.join("\n")))
			.setButtonAccessory(
				new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId("restock-quantity").setLabel("Set quantity") /*.setDisabled(true)*/,
			)

		const SendLines = ["### :two: Finally send the message!", `-# Expires <t:${Math.floor(Date.now() / 1000) + timeout * 60 + 1}:R>`]
		const SendSec = new SectionBuilder()
			.addTextDisplayComponents(new TextDisplayBuilder().setContent(SendLines.join("\n")))
			.setButtonAccessory(
				new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("restock-send").setLabel("Send message") /*.setDisabled(true)*/,
			)

		container.addSectionComponents(NamesSec)
		container.addActionRowComponents(drops)
		container.addSeparatorComponents(sep2)
		container.addSectionComponents(QuantitySec)
		container.addSeparatorComponents(sep2)
		container.addSectionComponents(SendSec)

		const msg = await interaction.editReply({
			components: [container],
			flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
		})

		// ---------------------

		const collector = msg.createMessageComponentCollector({ time: timeout * 60_000 })
		const data = { games: [], quantities: {} }
		collector.on("end", () => interaction.deleteReply().catch(() => {}))
		collector.on("collect", async (i) => {
			const games = data.games.flat()
			if (i.customId.includes("restock_names")) {
				await i.deferReply({ flags: [MessageFlags.Ephemeral] }).catch(() => {})
				data.games[i.customId.split("_")[2]] = i.values

				await i.deleteReply()

				// Enable button
				// if (data.games.flat().length >= 1) {
				// }
			} else if (i.customId.includes("restock-quantity")) {
				if (!games.length) return i.deferReply().then(() => i.deleteReply())

				const chunks = []
				let newInteraction = i
				for (let idx = 0; idx < games.length; idx += 5) {
					const modal = new ModalBuilder()
						.setCustomId("restock-modal")
						.setTitle("Set quantity (max: 1295)")
						.addLabelComponents(
							games.slice(idx, idx + 5).map((id) => {
								const maxLength = 45 - 4 - id.toString().length
								return (
									new LabelBuilder()
										// Limit of 45 chars
										.setLabel(`${list[id].length > maxLength ? list[id].slice(0, maxLength - 2).trim() + ".." : list[id]} (${id}):`)
										.setTextInputComponent(
											new TextInputBuilder().setRequired(true).setCustomId(`restock-quantity-${id}`).setStyle(TextInputStyle.Short),
										)
								)
							}),
						)

					if (idx !== 0) {
						const msg = await newInteraction.reply({
							content: `Set! Let's go with the next modal (discord limit)`,
							components: [
								new ActionRowBuilder().addComponents(
									new ButtonBuilder().setLabel("Next modal").setStyle(ButtonStyle.Primary).setCustomId("restock-quantity-next"),
								),
							],
							flags: [MessageFlags.Ephemeral],
						})

						const res = await (await msg.fetch()).awaitMessageComponent({ time: timeout * 60_000 }).catch(() => null)
						if (!res) return
						newInteraction = res
					}

					await newInteraction.showModal(modal)

					const modalSubmit = await newInteraction.awaitModalSubmit({ time: timeout * 60_000 }).catch(() => null)
					if (!modalSubmit) return

					modalSubmit.fields.fields.forEach((field) => {
						const id = field.customId.replace("restock-quantity-", "")
						const nb = parseInt(field.value)
						if (isNaN(nb)) return

						data.quantities[id] = Math.min(nb, 1295) // base36 max for 2 chars
					})

					newInteraction = modalSubmit
				}

				await newInteraction.reply({
					content: `Quantities set (if missing, make sure to pass an INTEGER)\n- ${data.games
						.flat()
						.map((id) => `**${list[id]}** (*${id}*): \`${data.quantities[id]}\``)
						.join("\n- ")}`,
					flags: [MessageFlags.Ephemeral],
				})
			} else if (i.customId.includes("restock-send")) {
				if (!games.length || games.some((id) => !data.quantities[id])) {
					await i.reply({
						content: "Make sure to select games and set the quantities!",
						flags: [MessageFlags.Ephemeral],
					})
					return
				}

				const isGuild = interaction.authorizingIntegrationOwners[ApplicationIntegrationType.GuildInstall] !== undefined

				await i.deferReply({ flags: MessageFlags[isGuild ? "Ephemeral" : "IsComponentsV2"] }).catch(() => {})

				const stock_container = await getRestockMessage({ games, data })

				if (isGuild) {
					const channel = await client.channels.fetch(i.channelId)
					channel?.send({ components: [stock_container], allowedMentions: { parse: [] }, flags: MessageFlags.IsComponentsV2 })
					i.deleteReply()
				} else {
					await i.editReply({
						components: [stock_container],
						allowedMentions: { parse: [] },
						flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
					})
				}
			}
		})
	},
}
