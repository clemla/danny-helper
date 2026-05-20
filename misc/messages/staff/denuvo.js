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

const TitleLines = ["# 📘 How does denuvo work ?", "Starts with an explanation then actual debug.", "-# Skip lines if you fee like it"]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const ExplanationLines = [
	"## Denuvo explanation",
	"- Denuvo is a protection on games that is hard to crack (cause encoded, needs to explore the game etc)",
	"- When you buy a copy on steam, the ACCOUNT gets 5 activations that resets every 24H.",
	"- That's when family share comes in handy, you can get up to 30 per day with one bought copy (except for WWE 2K26...)",
	"- To activate a game with the *not intended method* you either use [steamtools](<https://drm.steam.run>) or GBE files",
	"  - Steamtools is used in <#1466114598301204676>. GBE files in <#1465275824075833477> (also called tokeer)",
	"- Let's not get to the debug part!",
]
const ExplanationText = new TextDisplayBuilder().setContent(ExplanationLines.join("\n"))

const DebugLines = [
	"## Debugging the `Anti-Tamper` error",
	"> You have 3 main errors on denuvo activation, `00`, `05` and `06`",
	"- `00` means no token was found, GBE files are not pasted correctly.",
	"  - Files MUST be in the game folder in the ROOT, archive must be EXTRACTED.",
	"- `05` means the activation broke, you need a new one.",
	"  - Either caused by the rules on the right or the game wasn't SUCCESSFULLY started before 30mins once the key was created.",
	"- `06` means the account ran out of activation, you can use /regen in a ticket to get a new one.",
]
const DebugSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(DebugLines.join("\n")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("attachment://Break%20Rules.png"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(ExplanationText)
container.addSeparatorComponents(sep2)
container.addSectionComponents(DebugSec)
// Files

const files = {}

files["Break%20Rules.png"] = new AttachmentBuilder().setName("Break%20Rules.png").setFile(fs.readFileSync("misc/assets/Break Rules.png"))

module.exports = { container, files: Object.values(files) }
