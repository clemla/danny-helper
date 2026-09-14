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

const TitleLines = ["# ⏳ Tokeer: Cooldowns & Reserve", "-# Cooldowns, per-account quota, and the donor reserve."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Cooldowns",
	"`/tokeer-cooldown <user> <action> [type] [days]` - Add or remove a cooldown. `[cooldown_manage]`",
	"`/tokeer-check-cooldown <user>` - Check one user's cooldowns. `[cooldown_manage]`",
	"`/tokeer-cooldowns` - List all active cooldowns. `[cooldown_manage]`",
	"`/tokeer-remove-all-cooldowns` - Clear everyone's cooldowns. `[cooldown_manage]`",
	"## Quota & reserve",
	"`/tokeer-quota <app_id>` - Per-account token usage with +/-/Exhaust buttons. `[manage_quota]`",
	"`/tokeer-reserve-list` - List donor-reserved games and their percent. `[setup_panel]`",
	"`/tokeer-reserve-add <app_id>` - Add a game to the donor reserve. `[setup_panel]`",
	"`/tokeer-reserve-remove <app_id>` - Remove a game from the donor reserve. `[setup_panel]`",
	"`/tokeer-reserve-percent <percent>` - Set the donor share percent. `[setup_panel]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
