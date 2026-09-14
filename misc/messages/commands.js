const {
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	ActionRowBuilder,
} = require("discord.js")

const color = [125, 249, 255]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# 🛠️ Danny Bot — Staff Commands", "Every staff command, sorted by area.", "-# Pick a category below to see its commands."]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const IntroLines = [
	"## How permissions work",
	"A command runs if you are a server **Administrator**, or if one of your roles was granted its permission node with `/perms grant`.",
	"Each command below is tagged with the node it needs, like `[approve]` or `[manage_bans]`.",
]
const IntroText = new TextDisplayBuilder().setContent(IntroLines.join("\n"))

const Buttons = [
	new ButtonBuilder().setCustomId("dcmd-tokeer-activation").setLabel("🎮 Tokeer: Activation").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-tokeer-tickets").setLabel("🎟️ Tokeer: Tickets & Bans").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-tokeer-cooldowns").setLabel("⏳ Tokeer: Cooldowns & Reserve").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-tokeer-catalog").setLabel("🗂️ Tokeer: Catalog & Audit").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-tokeer-posting").setLabel("📣 Tokeer: Posting").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-ea").setLabel("🔴 EA Tokeer").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-ubi").setLabel("🔵 UbiTokeer").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-activation").setLabel("🤝 Activation & Panels").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-profiles").setLabel("👤 Profiles & Roles").setStyle(ButtonStyle.Secondary),
	new ButtonBuilder().setCustomId("dcmd-perms").setLabel("🔑 Perms & AI").setStyle(ButtonStyle.Secondary),
]
const Rows = []
for (let i = 0; i < Buttons.length; i += 5) {
	Rows.push(new ActionRowBuilder().addComponents(Buttons.slice(i, i + 5)))
}

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(IntroText)
container.addSeparatorComponents(sep2)
Rows.forEach((row) => container.addActionRowComponents(row))

module.exports = { container, files: [] }
