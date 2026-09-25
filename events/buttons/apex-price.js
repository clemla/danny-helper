const {
	MessageFlags,
	ModalBuilder,
	LabelBuilder,
	TextInputBuilder,
	TextInputStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js")

const color = [218, 165, 32]
const contacts = "<@503862212679696394> or <@817402736232103976>"

function showModal(interaction) {
	const input = new TextInputBuilder()
		.setCustomId("appid")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder("3764200")
		.setMaxLength(200)
		.setRequired(true)

	const modal = new ModalBuilder()
		.setCustomId("apex-price-modal")
		.setTitle("Find the cheapest key")
		.addLabelComponents(
			new LabelBuilder()
				.setLabel("Steam AppID")
				.setDescription("The number in the game's Steam store link. Pasting the link works too.")
				.setTextInputComponent(input),
		)
	return interaction.showModal(modal)
}

function text(lines) {
	return new TextDisplayBuilder().setContent(lines.join("\n"))
}

function buildResult({ appid, game, deals }) {
	const container = new ContainerBuilder().setAccentColor(color)
	const thisYear = new Date().getFullYear()

	const head = [`## ${game?.name || `AppID ${appid}`}`, `-# AppID ${appid}${game?.released ? ` | Released ${game.released}` : ""}`]
	if (game?.image) {
		container.addSectionComponents(
			new SectionBuilder().addTextDisplayComponents(text(head)).setThumbnailAccessory(new ThumbnailBuilder().setURL(game.image)),
		)
	} else {
		container.addTextDisplayComponents(text(head))
	}

	const warnings = []
	if (game?.year && game.year !== thisYear) warnings.push(`:x: This came out in ${game.year}. We only take games released in ${thisYear} now.`)
	if (game && !game.denuvo) warnings.push(":warning: Steam doesn't list Denuvo for this game, ask us before you buy it.")
	if (warnings.length) container.addTextDisplayComponents(text(warnings))

	container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small))

	if (!deals.length) {
		container.addTextDisplayComponents(text([`No key store has this game listed right now. DM ${contacts} for other ways to donate.`]))
		return container
	}

	for (const d of deals.slice(0, 6)) {
		const off = d.retail > d.price ? ` ~~$${d.retail.toFixed(2)}~~ \`-${Math.round((1 - d.price / d.retail) * 100)}%\`` : ""
		container.addSectionComponents(
			new SectionBuilder()
				.addTextDisplayComponents(text([`**$${d.price.toFixed(2)}** at **${d.store}**${off}`]))
				.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Buy").setURL(d.url)),
		)
	}

	container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small))
	container.addTextDisplayComponents(
		text([
			`-# Prices in USD. Check the store page says the key is global (or works in your region) before you pay, then DM the key to either ${contacts}.`,
		]),
	)
	return container
}

module.exports = {
	name: "interactionCreate",

	/**
	 * @param {import('discord.js').Interaction} interaction
	 * @param {import('discord.js').Client} client
	 */
	execute: async (interaction, client) => {
		if (interaction.isButton() && interaction.customId === "apex-price") return showModal(interaction).catch(() => {})
		if (!interaction.isModalSubmit() || interaction.customId !== "apex-price-modal") return

		const raw = interaction.fields.getTextInputValue("appid").trim()
		const appid = (raw.match(/\/app\/(\d+)/) || raw.match(/^(\d+)$/))?.[1]
		if (!appid) {
			return interaction
				.reply({ content: "That doesn't look like an AppID. It's the number in the store link, like `3764200`.", flags: MessageFlags.Ephemeral })
				.catch(() => {})
		}

		await interaction.deferReply({ flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }).catch(() => {})

		let result
		try {
			result = await require("functions/keyPrices").lookup(appid)
		} catch (err) {
			console.error("apex-price", appid, err)
			return interaction
				.editReply({ components: [new ContainerBuilder().addTextDisplayComponents(text(["Couldn't reach the price sites right now, try again in a minute."]))] })
				.catch(() => {})
		}

		if (!result.game && !result.deals.length) {
			return interaction
				.editReply({ components: [new ContainerBuilder().addTextDisplayComponents(text([`Couldn't find a Steam game with AppID \`${appid}\`.`]))] })
				.catch(() => {})
		}

		await interaction.editReply({ components: [buildResult(result)], allowedMentions: { parse: [] } }).catch(console.error)
	},
}
