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

const TitleLines = ["# 🎟️ Tokeer: Tickets & Bans", "-# Cleaning up tickets, bans, and alt handling."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Tickets",
	"`/tokeer-cleanup` - Close all stuck/completed tickets and delete their channels. `[manage_tickets]`",
	"`/tokeer-cleanup-user <user>` - Close stuck tickets for one user so they can reopen. `[manage_tickets]`",
	"`/tokeer-nuke-threads` - Delete all ticket threads and clear cooldowns. `[manage_tickets]`",
	"## Bans",
	"`/tokeer-ban <user> [reason]` - Ban a user from Tokeer. `[manage_bans]`",
	"`/tokeer-unban <user>` - Unban a user. `[manage_bans]`",
	"`/tokeer-unban-all` - Unban everyone. `[manage_bans]`",
	"`/tokeer-banlist` - List banned users. `[manage_bans]`",
	"`/tokeer-check-ban <user>` - Check if a user is banned. `[manage_bans]`",
	"## Alts",
	"`/alt-exempt <a> <b> [reason]` - Stop two accounts matching each other as alts. `[manage_bans]`",
	"`/alt-unexempt <a> <b>` - Undo an alt exemption. `[manage_bans]`",
	"`/alt-exempt-list [user]` - List cleared alt pairs. `[manage_bans]`",
	"`/alt-forget <user>` - Wipe a user's device/hardware history. `[manage_bans]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
