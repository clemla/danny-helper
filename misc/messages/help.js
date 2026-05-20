const {
	AttachmentBuilder,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} = require("discord.js")
const fs = require("fs")

const container = new ContainerBuilder().setAccentColor([255, 170, 51])
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`# :warning: Quick help`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`### Follow those steps, ask for help in the ticket if not working.`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# Be precise in the ticket and don't waste everyone's time ;)`))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL(`https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024`),
	)

const CodeLines = ["## :one: D-Report Code not generating ?", "Make sure to have ALL the requirements validated. (WUB+game installed)"]
const CodeText = new TextDisplayBuilder().setContent(CodeLines.join("\n- "))

const WhereCodeLines = [
	"It is in your clipboard by default, use `CTRL+V`",
	"Or at the bottom of the script in the __purple box__ (Exemple on the right)",
]
const WhereCodeSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## :two: Where is the D-Report Code ?`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent("- " + WhereCodeLines.join("\n- ")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("attachment://D-Report%20Code.png"))

const AntiTamperLines1 = ["- Ends in `00`", "  - You didn't paste the files correctly, reread the instructions in the ticket"]
const AntiTamperLines2 = [
	"- Ends in `05`",
	"  - Your activation broke, make sure to follow the rules (on the right). You need a __new__ activation",
	"- Ends in `06`",
	"  - Sorry, this is a bug. Ask for help in the ticket (using the button) and support team will handle the situation",
]
const AntiTamperSec1 = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## :three: "Something went wrong" ?`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(AntiTamperLines1.join("\n")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("attachment://Anti%20Tamper.png"))
const AntiTamperSec2 = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(AntiTamperLines2.join("\n")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("attachment://Break%20Rules.png"))

const LocalFilesLines = ["- Right click the game in your __library__", `- "Manage" => "Browse local files"`, "  - Exemple on the right"]
const LocalFilesSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## :file_folder: Where are the game files ?`))
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(LocalFilesLines.join("\n")))
	.setThumbnailAccessory(new ThumbnailBuilder().setURL("attachment://Local%20Files.png"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(CodeText)
container.addSeparatorComponents(sep2)
container.addSectionComponents(WhereCodeSec)
container.addSeparatorComponents(sep2)
container.addSectionComponents([AntiTamperSec1, AntiTamperSec2])
container.addSeparatorComponents(sep)
container.addSectionComponents(LocalFilesSec)

// Files

const files = {}

files["D-Report%20Code.png"] = new AttachmentBuilder().setName("D-Report%20Code.png").setFile(fs.readFileSync("misc/assets/D-Report Code.png"))
files["Break%20Rules.png"] = new AttachmentBuilder().setName("Break%20Rules.png").setFile(fs.readFileSync("misc/assets/Break Rules.png"))
files["Anti%20Tamper.png"] = new AttachmentBuilder().setName("Anti%20Tamper.png").setFile(fs.readFileSync("misc/assets/Anti Tamper.png"))
files["Local%20Files.png"] = new AttachmentBuilder().setName("Local%20Files.png").setFile(fs.readFileSync("misc/assets/Local Files.png"))

// Specific sections
const specifics = {
	code_missing: {
		container: new ContainerBuilder().setAccentColor([255, 170, 51]).addTextDisplayComponents(CodeText),
		files: [files["D-Report%20Code.png"]],
	},
	code_location: {
		container: new ContainerBuilder().setAccentColor([255, 170, 51]).addSectionComponents(WhereCodeSec),
		files: [files["D-Report%20Code.png"]],
	},
	anti_tamper: {
		container: new ContainerBuilder().setAccentColor([255, 170, 51]).addSectionComponents([AntiTamperSec1, AntiTamperSec2]),
		files: [files["Break%20Rules.png"], files["Anti%20Tamper.png"]],
	},
	game_files: {
		container: new ContainerBuilder().setAccentColor([255, 170, 51]).addSectionComponents(LocalFilesSec),
		files: [files["Local%20Files.png"]],
	},
}

module.exports = { container, files: Object.values(files), specifics }
