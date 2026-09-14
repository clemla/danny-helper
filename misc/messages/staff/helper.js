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
	FileBuilder,
} = require("discord.js")
const fs = require("fs")

const color = [125, 249, 255]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# 🔑 Danny Helper", "The messages bot.", "-# Skip lines if you feel like it"]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const ExplanationLines = [
	"## Commands",
	"`/guide` - Full staff guide with every command, sorted by category.",
	"`/messages req` - Sends the requirements message.",
	"- Sections: `WUB`, `Downloaded`, `Specs`, `Hypervisor`",
	"`/messages help` - Sends the quick help message.",
	"- Sections: `Code missing`, `Code location`, `Anti-Tamper`, `Game files`",
	"`/messages apex` - Sends the Apex donation message.",
	"- Sections: `Requirement`, `Benefits`, `Guide`",
	"`/messages plugin` - Sends the Steam plugin guide.",
	"- Sections: `Installation`, `Usage`, `Side links`",
	"`/messages staff` - Sends the staff guide hub.",
	"`/restock` - Sends the restock timestamps message.",
	"- Select the games, fill the modal for quantities, send!",
	"`/refresh-games` - Refreshes the game list used by `/restock`.",
	"`/delto` - Deletes messages after a given message id (up to 100).",
]

const ExplanationText = new TextDisplayBuilder().setContent(ExplanationLines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(ExplanationText)

// Files

const files = {}

module.exports = { container, files: Object.values(files) }
