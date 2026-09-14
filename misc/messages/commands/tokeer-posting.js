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

const TitleLines = ["# 📣 Tokeer: Posting", "-# Posting info panels and handling memberships."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"`/maintainance` - Post the maintenance-break GIF. `[setup_panel]`",
	"`/validator-guide` - Post the Validator step-by-step guide (EN + PT). `[setup_panel]`",
	"`/donate [images...]` - Post the donation-options panel. `[setup_panel]`",
	"`/india-membership <user> <tier>` - Grant a UPI member a Lua tier role for one month. `[setup_panel]`",
	"`/india-membership-remove <user> <tier>` - Remove a UPI membership early. `[setup_panel]`",
	"`/video-tutorials [...]` - Post the video-tutorials panel. `[setup_panel]`",
	"`/showcase <user>` - Post an Apex-Donor showcase template. `[setup_panel]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
