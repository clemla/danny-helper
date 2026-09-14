const {
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} = require("discord.js")

const color = [125, 249, 255]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# 📦 Restock", "-# Restock timestamps and the game list."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## `/restock`",
	"Builds and sends the restock timestamps message.",
	"- Pick the games from the menus",
	"- Fill the modal with the quantities",
	"- Send it into the channel",
	"-# Requires Manage Messages. The session stays open for 20 minutes.",
	"## `/refresh-games`",
	"Manually refreshes the game list that `/restock` reads from.",
	"-# Requires Manage Messages. Run it if a new game is missing from `/restock`.",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
