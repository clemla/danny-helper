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

const TitleLines = ["# 👤 Profiles & Roles", "-# User profiles, strikes, and game roles."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"## Profiles",
	"`/admin-set <user> <field> <value>` - Set a profile field to an absolute value. `[manage_tokens]`",
	"`/admin-add <user> <field> <amount>` - Add or subtract a profile field (negative to subtract). `[manage_tokens]`",
	"`/strike <user> <reason>` - Issue a strike and apply the automatic punishment. `[manage_strikes]`",
	"`/remove-strike <strike_id>` - Remove a strike by id. `[manage_strikes]`",
	"`/untimeout <user>` / `/untimeout-all` - Remove Discord timeouts. `[manage_strikes]`",
	"`/stats <category> [ephemeral]` - Global bot statistics. `[view_stats]`",
	"`/validate-roles` - Create/validate game roles and offer orphan cleanup. `[manage_roles]`",
	"`/assign-roles` - Assign game roles to everyone who owns them. `[manage_roles]`",
	"## Game roles",
	"`/game-roles-backfill` - Copy per-game role holders into the owned-games database. `[manage_roles]`",
	"`/game-roles-purge [confirm]` - Preview, or with confirm:true DELETE per-game roles (backs up first). `[manage_roles]`",
]
const Text = new TextDisplayBuilder().setContent(Lines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(Text)

module.exports = { container, files: [] }
