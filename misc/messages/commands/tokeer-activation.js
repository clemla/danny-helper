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

const TitleLines = ["# 🎮 Tokeer: Activation", "-# Delivering keys and posting the Steam panels."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## In a ticket",
	"`/approve` - Mint and deliver the ticket's key, skipping validation. `[approve]`",
	"`/regen` - Re-mint a token on a completed ticket when the first one failed. `[approve]`",
	"`/regenex` - Denuvo error-006 regen: retire the bad account, then re-issue from a clean one. `[approve]`",
	"`/review` - Skip the \"Game worked\" button: confirm, request the vouch, apply cooldown, close. `[approve]`",
	"## Panels",
	"`/tokeer <appid>` - Post a single-game activation panel. `[setup_panel]`",
	"`/tokeer-panel` - Post the multi-game panel. `[setup_panel]`",
	"`/tokeer-linux-panel` - Post the Linux/Proton (Steam Deck) panel. `[setup_panel]`",
	"`/tokeer-donor-panel` - Post the donor-reserved panel. `[setup_panel]`",
	"`/tokeer-role-panel` - Post a role-only games panel. `[setup_panel]`",
	"`/tokeer-panel-schedule <minutes>` - Auto-post the multi-game panel after a countdown. `[setup_panel]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
