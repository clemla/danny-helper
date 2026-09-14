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

const TitleLines = ["# 🔴 EA Tokeer", "-# EA / Denuvo token activations."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Panels & tickets",
	"`/ea-tokeer <content_id>` - Post a single-game EA panel. `[setup_panel]`",
	"`/ea-panel` - Post the multi-game EA panel. `[setup_panel]`",
	"`/ea-role-panel` - Post the role-gated EA panel. `[setup_panel]`",
	"`/ea-approve` - Approve the ticket so the request is accepted and the token minted. `[approve]`",
	"`/ea-review` - Staff-trigger the vouch step. `[approve]`",
	"## Bans & cleanup",
	"`/ea-ban <user> [reason]` / `/ea-unban <user>` / `/ea-banlist` - EA bans. `[manage_bans]`",
	"`/ea-cleanup` - Close stuck EA tickets. `[manage_tickets]`",
	"`/ea-nuke-threads` - Delete all EA threads and clear cooldowns. `[manage_tickets]`",
	"## Cooldowns",
	"`/ea-cooldown <user> <action> [type] [days]` - Give or remove cooldowns (EA + Tokeer + Ubi). `[cooldown_manage]`",
	"`/ea-check-cooldown <user>` - Check EA cooldowns. `[cooldown_manage]`",
	"`/ea-cooldowns` - List active EA cooldowns. `[cooldown_manage]`",
	"`/ea-remove-all-cooldowns` - Clear all EA + Tokeer cooldowns. `[cooldown_manage]`",
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
