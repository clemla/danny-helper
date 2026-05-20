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
} = require("discord.js")
const fs = require("fs")

const container = new ContainerBuilder().setAccentColor([93, 63, 211])
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`# :rotating_light: Requirements, MUST HAVE!`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`### Complete all the requirements BEFORE opening a ticket.`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# Don't waste everyone's time ;)`))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL(`https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024`),
	)

const WubDownload = "https://www.sordum.org/files/downloads.php?st-windows-update-blocker"
const WubLines = [
	"Download, Extract, run `WUB.exe`",
	"Select `Disable Updates` __AND__ tick `Protect Services Settings`",
	`Apply and make sure the shield is __RED__ (Exemple on the right)`,
]
const WubTitle = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## :one: Must have [WUB](<${WubDownload}>) activated!`))
	.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Download WUB").setURL(WubDownload))
const WubSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent("- " + WubLines.join("\n- ")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("attachment://WUB.png"))

const PluginLink = "https://discord.com/channels/1408201417834893385/1409591971080573029"
const DownloadedLines = [
	"Have the game FULLY downloaded (Exemple on the right)",
	"Only available source is from STEAM (not sigma/hydra/archives etc...)",
	`You can use the [Luatools plugin](<${PluginLink}>) to get the game`,
]
const DownloadedTitle = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## :two: Must have the game from __STEAM and FULLY__ downloaded!`))
	.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Plugin link").setURL(PluginLink))
const DownloadedSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent("- " + DownloadedLines.join("\n- ")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("attachment://Downloaded.png"))

const CYRILink = "https://www.systemrequirementslab.com/cyri"
const CYRISec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## :three: Have the minimum PC specs!`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`- You can check on [Can you run it?](<${CYRILink}>)`))
	.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Website link").setURL(CYRILink))

const HypervisorLines = [
	"## :four: No Hypervisor file!",
	"Having the hypervisor method won't let you open the game with an activation",
	"Remove the related files",
]
const HypervisorText = new TextDisplayBuilder().setContent(HypervisorLines.join("\n- "))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addSectionComponents([WubTitle, WubSec])
container.addSeparatorComponents(sep2)
container.addSectionComponents([DownloadedTitle, DownloadedSec])
container.addSeparatorComponents(sep2)
container.addSectionComponents([CYRISec])
container.addSeparatorComponents(sep2)
container.addTextDisplayComponents(HypervisorText)

// Files

const files = {}

files["WUB.png"] = new AttachmentBuilder().setName("WUB.png").setFile(fs.readFileSync("misc/assets/WUB.png"))
files["Downloaded.png"] = new AttachmentBuilder().setName("Downloaded.png").setFile(fs.readFileSync("misc/assets/Downloaded.png"))

// Specific sections
const specifics = {
	wub: { container: new ContainerBuilder().setAccentColor([93, 63, 211]).addSectionComponents([WubTitle, WubSec]), files: [files["WUB.png"]] },
	downloaded: {
		container: new ContainerBuilder().setAccentColor([93, 63, 211]).addSectionComponents([DownloadedTitle, DownloadedSec]),
		files: [files["Downloaded.png"]],
	},
	specs: { container: new ContainerBuilder().setAccentColor([93, 63, 211]).addSectionComponents([CYRISec]), files: [] },
	hypervisor: { container: new ContainerBuilder().setAccentColor([93, 63, 211]).addTextDisplayComponents(HypervisorText), files: [] },
}

module.exports = { container, files: Object.values(files), specifics }
