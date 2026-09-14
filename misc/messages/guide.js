const {
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	ActionRowBuilder,
} = require("discord.js")

const color = [125, 249, 255]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# 📘 Danny Helper — Staff Guide", "Every command, and what it's for.", "-# Pick a category below."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const IntroLines = [
	"## Categories",
	"🛡️ **Moderation** - message cleanup tools",
	"💬 **Messages** - send the canned help / requirement / guide messages",
	"📦 **Restock** - restock timestamps and the game list",
]
const IntroText = new TextDisplayBuilder().setContent(IntroLines.join("\n"))

const Buttons = [
	new ButtonBuilder().setCustomId("guide-moderation").setLabel("🛡️ Moderation").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("guide-messages").setLabel("💬 Messages").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("guide-restock").setLabel("📦 Restock").setStyle(ButtonStyle.Secondary),
]
const ButtonsRow = new ActionRowBuilder().addComponents(Buttons)

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(IntroText)
container.addSeparatorComponents(sep2)
container.addActionRowComponents(ButtonsRow)

module.exports = { container, files: [] }
