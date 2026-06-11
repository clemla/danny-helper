const {
	AttachmentBuilder,
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	MediaGalleryBuilder,
	MediaGalleryItemBuilder,
} = require("discord.js")
const fs = require("fs")

const pluginCommand = 'irm "https://ps.lua.tools/install-plugin.ps1" | iex'
const manualLink = "https://wiki.lua.tools/docs/luatools/steam-plugin/get-started/"
const helpLink = "https://discord.com/channels/1408201417834893385/1408702655517429791"
const color = [93, 63, 211]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# :gem: Steam plugin guide !", "Add free games on steam with two clicks", "-# Read this before asking for help <3"]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/icons/1408201417834893385/f5c9265968b03ac3e554063df0aa1d03.webp?size=1024"),
	)

const InstallationLines = [
	"## 🛠️ Installation",
	"- Run this script in **powershell**",
	`\`\`\`ps\n${pluginCommand}\`\`\``,
	"-# This will install Steamtools, Millennium and the plugin itself !",
]
const InstallationSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(InstallationLines.join("\n")))
	.setButtonAccessory(new ButtonBuilder().setLabel("Manual method").setStyle(ButtonStyle.Link).setURL(manualLink))

const UsageLines = [
	"## 📘 Usage",
	"- 🎮 Add a game:",
	'  - Head to its **store page** -> `"Add via LuaTools"` on the **top right** -> `"Restart Steam"`',
	"- 🗑️ Remove a game:",
	'  - Head to its **store page** -> **<:luatools:1496512019409408062> icon** -> `"Remove via LuaTools"` -> `"Restart Steam"`',
	"- 🩹 Apply a fix:",
	'  - Head to its **store page** -> **<:luatools:1496512019409408062> icon** -> `"Fixes Menu"`',
	"- 🌐 Play online:",
	"  - Head to [online-fix](<https://online-fix.me>) -> Browse to the game -> Check the **Online-Fix Hosters** -> Add the `Fix_Repair_Steam_Generic` to your game folder",
	"- 🔓 Bypass denuvo:",
	"  - Join our [denuvo server](<https://discord.gg/denuvo>)",
]
const UsageText = new TextDisplayBuilder().setContent(UsageLines.join("\n"))

const SideLinksLines = [
	"## 🔗 Side-links",
	"- Automatically make a steam collection with added games:",
	"  - Get the [`Steamtools collection` plugin](<https://github.com/clemdotla/steamtools-collection>)",
	"- Need help ?",
	`  - Check [this channel (read pinned messages)](<${helpLink}>)`,
]
const SideLinksSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(SideLinksLines.join("\n")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("https://github.com/clemdotla/steamtools-collection/blob/main/assets/collection.png?raw=true"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addSectionComponents(InstallationSec)
container.addSeparatorComponents(sep2)
container.addTextDisplayComponents(UsageText)
container.addSeparatorComponents(sep2)
container.addSectionComponents(SideLinksSec)

// Files

const files = {}

// Specific sections
const specifics = {
	installation: { container: new ContainerBuilder().setAccentColor(color).addSectionComponents([InstallationSec]), files: [] },
	usage: { container: new ContainerBuilder().setAccentColor(color).addTextDisplayComponents([UsageText]), files: [] },
	side_links: { container: new ContainerBuilder().setAccentColor(color).addSectionComponents([SideLinksSec]), files: [] },
}

module.exports = { container, files: Object.values(files), specifics }
