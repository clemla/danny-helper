const {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} = require("discord.js")

module.exports = async ({ games, data }) => {
	const list = require("misc/game_list.json")
	const res = await fetch(process.env.quota_endpoint)
	const json = await res.json()
	const output = []

	games?.forEach((id) => {
		const quantity = data?.quantities[id]
		if (quantity <= 0) return
		const timestamps = json[BigInt(id)]?.accounts
			.map((acc) => acc.discord_timestamp)
			.filter(Boolean)
			.sort((a, b) => a - b)
			.slice(0, quantity)
			.map((t) => `<t:${t}:R>`)
		if (!timestamps.length) return

		const gameName = `**__${list[id]}__**`
		if (quantity == 1 || timestamps.length == 1) {
			output.push(`- ${gameName}: ${timestamps[0]}`)
		} else {
			const grouped = []
			for (let i = 0; i < timestamps.length; i += 2) {
				grouped.push(`  - ${timestamps.slice(i, i + 2).join(" | ")}`)
			}

			output.push(`- ${gameName}:\n${grouped.join("\n")}`)
		}
	})

	// --------------
	const color = [125, 249, 255]
	const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
	const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

	const stock_container = new ContainerBuilder().setAccentColor(color)

	const StockLines = ["# 📦 Incoming restocks 🚛\n", output.join("\n")]
	const StockSec = new SectionBuilder()
		.addTextDisplayComponents(new TextDisplayBuilder().setContent(StockLines.join("\n")))
		.setThumbnailAccessory(
			new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
		)

	const ReqSec = new SectionBuilder()
		.addTextDisplayComponents(new TextDisplayBuilder().setContent("### :rotating_light: Fulfill ALL __requirements__ before opening !"))
		.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Requirements").setCustomId("messages-req"))
	const HelpSec = new SectionBuilder()
		.addTextDisplayComponents(new TextDisplayBuilder().setContent("### :warning: Take a look at the __quick help__ section !"))
		.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Quick help").setCustomId("messages-help"))

	// prettier-ignore
	const ApexSec = new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent("### :crown: Own a denuvo game ? Get rewards by helping !"))
        .setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Apex donation").setCustomId("messages-apex"))

	const RefreshButton = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel("Refresh")
			.setStyle(ButtonStyle.Secondary)
			.setCustomId(`refresh-${games.map((id) => `${BigInt(id).toString(36)}${data.quantities[id].toString(36).padStart(2, "0")}`).join(".")}`),
	)

	stock_container.addSectionComponents(StockSec)
	stock_container.addActionRowComponents([RefreshButton])
	stock_container.addSeparatorComponents(sep2)
	stock_container.addSectionComponents([ReqSec, HelpSec])
	stock_container.addSeparatorComponents(sep2)
	stock_container.addSectionComponents(ApexSec)

	return stock_container
}
