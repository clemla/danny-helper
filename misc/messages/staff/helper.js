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

const TitleLines = ["# 🔑 Danny Helper", "The messages bot.", "-# Skip lines if you fee like it"]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const ExplanationLines = [
	"## Commands",
	"`/messages req` - Sends the requirement message from <#1465275824075833477>",
	"- Sections: `WUB`, `Game installed`, `Specs (CanYouRunIt)`, `Hypervisor`",
	"`/messages help` - Sends the help message from <#1465275824075833477>",
	"- Sections: `D-Report Code`, `Anti-Tamper errors`, `Files location`",
	"`/messages apex` - Sends the Apex Legends message from <#1465911881578446920>",
	"- Sections: `Requirements`, `Benefits`, `Guide`",
	"`/messages staff` - Sends the staff message from <#1497254268225192016>",
	"`/restock` - Sends the restock message from <#1465275824075833477>",
	"- Select the games, fill the modal for quantities, send!",
]

const ExplanationText = new TextDisplayBuilder().setContent(ExplanationLines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(ExplanationText)

// Files

const files = {}

module.exports = { container, files: Object.values(files) }
