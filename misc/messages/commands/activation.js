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

const TitleLines = ["# 🤝 Activation & Panels", "-# Peer activation tickets and the unified panels."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Activation",
	"`/setup-activation` - Post the activation panel. `[setup_panel]`",
	"`/reload-games` - Reload games from approvedappids.txt. `[manage_games]`",
	"`/activation-game-add <appid> <name>` / `/activation-game-remove <appid>` / `/activation-game-list [search]` - Manage activation games. `[manage_games]`",
	"`/close-ticket` - Force-close the current ticket (any service). `[close_ticket / force_close]`",
	"`/force-review-check` - Scan the vouches channel for missed reviews. `[admin]`",
	"`/cancel-activation <id>` - Force-cancel an activation. `[clear_activation]`",
	"`/clear-activation <user>` - Clear a user's stuck activation. `[clear_activation]`",
	"`/activation-cooldown remove|set|check|list` - Manage activation cooldowns. `[cooldown_manage]`",
	"## Unified panels",
	"`/setup-unified-panel` / `/setup-linux-panel` - Post the unified / Linux panels. `[setup_panel]`",
	"`/set-game-emoji <platform> <game_id> [steam_appid]` / `/remove-game-emoji <platform> <game_id>` - Manage panel emojis. `[setup_panel]`",
	"`/panel-toggle <platform> <state> [wave]` / `/panel-toggle-all <state>` - Open or close platforms. `[setup_panel]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
