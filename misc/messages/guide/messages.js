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

const TitleLines = ["# 💬 Messages", "-# Send the canned messages into a channel."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## `/messages <type> [section]`",
	"Posts a prepared message. Pick a `section` to send just one part instead of the whole thing.",
	"`/messages req` - requirements message",
	"- Sections: `WUB`, `Downloaded`, `Specs`, `Hypervisor`",
	"`/messages help` - quick help message",
	"- Sections: `Code missing`, `Code location`, `Anti-Tamper`, `Game files`",
	"`/messages apex` - Apex donation message",
	"- Sections: `Requirement`, `Benefits`, `Guide`",
	"`/messages plugin` - Steam plugin guide",
	"- Sections: `Installation`, `Usage`, `Side links`",
	"`/messages staff` - the staff guide hub (Denuvo / Tokeer / Helper)",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

const NoteLines = [
	"-# In a server the message is posted into the channel and you get a quiet confirmation. In DMs it is sent straight back to you.",
	"-# Some servers restrict where this can be used; use a commands or help channel if it is blocked.",
]
const NoteText = new TextDisplayBuilder().setContent(NoteLines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)
container.addSeparatorComponents(sep2)
container.addTextDisplayComponents(NoteText)

module.exports = { container, files: [] }
