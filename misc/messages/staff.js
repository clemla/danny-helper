const {
	AttachmentBuilder,
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	MediaGalleryBuilder,
	MediaGalleryItemBuilder,
	ActionRowBuilder,
} = require("discord.js")
const fs = require("fs")

const color = [125, 249, 255]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# 📘 Staff guide !", "Welcome to the team <3", "-# You can read this again whenever you want !"]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const SectionsText = new TextDisplayBuilder().setContent(
	"## This guide will be didvided into multiple sections\n## Click on the buttons below to target a specific topic.",
)
const Buttons = [
	new ButtonBuilder().setCustomId("staff-denuvo").setLabel("🔒 Denuvo").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("staff-tokeer").setLabel("⚡ Tokeer").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("staff-helper").setLabel("🤖 Helper").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("staff-...").setLabel(". . .").setStyle(ButtonStyle.Secondary).setDisabled(true),
]
const ButtonsRow = new ActionRowBuilder().addComponents(Buttons)

container.addSectionComponents(TitleSec)
// container.addSeparatorComponents(sep)
container.addTextDisplayComponents(SectionsText)
container.addSeparatorComponents(sep2)
container.addActionRowComponents(ButtonsRow)
container.addTextDisplayComponents(new TextDisplayBuilder().setContent("-# Not fully done, let clem know if you feel like something is missing !"))

// Files

const files = {}

module.exports = { container, files: Object.values(files) }
