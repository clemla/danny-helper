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

const TitleLines = ["# 🔑 Perms & AI", "-# Granting permission nodes and the AI helpers."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Permissions",
	"`/perms grant <role> [permissions]` - Grant permission node(s) to a role (blank opens a picker). `[admin]`",
	"`/perms revoke <role> [permissions]` - Revoke node(s) from a role. `[admin]`",
	"`/perms list [role]` - View all permissions, or one role's. `[admin]`",
	"`/perms commands` - List every permission node. `[admin]`",
	"## AI",
	"`!support` - Reload the knowledge base and report AI provider health. `[admin]`",
	"`!support-test <text>` - Dry-run whether the AI would reply, without posting. `[admin]`",
	"`!ticket-ai` - Tokeer triage status and provider health. `[admin]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
