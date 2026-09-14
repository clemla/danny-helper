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

const TitleLines = ["# 🔵 UbiTokeer", "-# Ubisoft token activations."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Panels & tickets",
	"`/ubi-tokeer <uplay_id>` - Post a single-game Ubisoft panel. `[setup_panel]`",
	"`/ubi-panel` / `/ubi-role-panel` - Post the multi-game / role-gated panels. `[setup_panel]`",
	"`/ubi-approve` - Approve the ticket so the upload mints the token. `[approve]`",
	"`/ubi-review` - Staff-trigger the vouch step. `[approve]`",
	"## Bans & cleanup",
	"`/ubi-ban <user> [reason]` / `/ubi-unban <user>` / `/ubi-banlist` - Ubisoft bans. `[manage_bans]`",
	"`/ubi-cleanup` - Close stuck Ubisoft tickets. `[manage_tickets]`",
	"`/ubi-nuke-threads` - Delete all Ubisoft threads and clear cooldowns. `[manage_tickets]`",
	"## Cooldowns",
	"`/ubi-cooldown <user> <action> [type] [days]` - Give or remove cooldowns. `[cooldown_manage]`",
	"`/ubi-check-cooldown <user>` / `/ubi-cooldowns` - Check or list cooldowns. `[cooldown_manage]`",
	"`/ubi-remove-all-cooldowns` - Clear all Ubi + Tokeer cooldowns. `[cooldown_manage]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

const ButtonLines = [
	"## Ticket buttons",
	"**Force Close (Admin)** - Force-close a ticket and save the transcript. `[force_close]`",
	"**Skip Verification (Admin)** - Skip the file check and advance to upload. `[admin]`",
	"**Accept Help Request** - Join the ticket thread to help.",
]
const ButtonText = new TextDisplayBuilder().setContent(ButtonLines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)
container.addSeparatorComponents(sep2)
container.addTextDisplayComponents(ButtonText)

module.exports = { container, files: [] }
