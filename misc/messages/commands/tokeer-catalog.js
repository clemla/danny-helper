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

const TitleLines = ["# 🗂️ Tokeer: Catalog & Audit", "-# Game catalog, delivery mode, tracking, and audits."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Catalog",
	"`/tokeer-enable <app_id>` / `/tokeer-disable <app_id>` - Show or hide a game everywhere. `[setup_panel]`",
	"`/tokeer-linux-enable <app_id>` / `/tokeer-linux-disable <app_id>` - Show or hide on the Linux panels. `[setup_panel]`",
	"`/tokeer-linux-disabled-list` - List Linux-hidden games. `[setup_panel]`",
	"`/tokeer-highdemand-add <keyword>` / `/tokeer-highdemand-remove <keyword>` - Mark or unmark 🔥 high-demand. `[manage_highdemand]`",
	"## Delivery & tracking",
	"`/tokeer-drm-add <app_id>` / `/tokeer-drm-remove <app_id>` - Switch a game to DRM-code delivery or back to zip. `[manage_drm]`",
	"`/tokeer-gbe <action> [app_id]` - Force-GBE list for Denuvo-012, syncs the validator. `[manage_drm]`",
	"`/track-game <appid>` / `/track-games <appids>` - Add game(s) to build-update tracking. `[setup_panel]`",
	"`/update-game-catalog`, `/update-high-demand`, `/update-activation-faq`, `/deploy-lua-info` - Refresh the info panels. `[setup_panel]`",
	"## Audit",
	"`/token-audit [user] [ticket_id] [limit]` - Audit generated ZIP tokens. `[manage_tokeer]`",
	"`/tokeer-audit <code>` - Check if a TokeerDRM code has been claimed. `[manage_tokeer]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
