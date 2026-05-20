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
	ActionRowBuilder,
	FileBuilder,
} = require("discord.js")
const fs = require("fs")

const color = [125, 249, 255]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# 🔑 Tokeer section", "The automated tickets.", "-# Skip lines if you fee like it"]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const ExplanationLines = [
	"## Tokeer explanation",
	"- Tokeer uses GBE files with a valid denuvo token.",
	"- Contains a `steam_settings` folder containing the token and achievements etc",
	"  - Also the `steamclient.dll` and `steamclient64.dll` but let's skip those",
	"- The `ColdClientLoader.ini` file is used to tell what .exe and what token to use etc",
	"- Most of the times it's provided with a custom .exe",
	"  - You need to start the game using this one, won't work from steam *natively*!",
	"  - But if you edit the startup commmand on steam, you can refer the custom .exe",
	'  - `"E:\\SteamLibrary\\steamapps\\common\\PRAGMATA\\START_PRAG.exe" %command%`',
	"- Don't ask how it works, it just does",
]
const ExplanationText = new TextDisplayBuilder().setContent(ExplanationLines.join("\n"))

const CommandsLines = [
	"## Command list",
	"> In tickets",
	"`/regen` - Regenerates the token (in case of 06 err or kindness)",
	"`/approve` - Bypasses Powershell check, only use if justified as it skips alt and installation checks",
	"`/close-ticket` - Closes the ticket",
	'`/review` - Skips the "Game worked" button, use if user can\'t read',
	"> Global commands",
	"`/tokeer-panel` - Sends the panel of games like in <#1465275824075833477>",
	"`/tokeer-check-cooldown` - Use USERID or mention",
	"`/tokeer-cooldown` - To set/remove the cooldown, in case of unhandled ticket",
	"`/tokeer-cleanup-user` - Deletes all tickets of a user, in case one got softlocked",
	"Same for `ubi` prefix, works for Ubisoft tokeer system",
]
const CommandsText = new TextDisplayBuilder().setContent(CommandsLines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(ExplanationText)
container.addFileComponents(new FileBuilder().setURL("attachment://Exemple_Pragmata.zip"))
container.addSeparatorComponents(sep2)
container.addTextDisplayComponents(CommandsText)
// Files

const files = {}

files["Exemple_Pragmata.zip"] = new AttachmentBuilder().setName("Exemple_Pragmata.zip").setFile(fs.readFileSync("misc/assets/Exemple_Pragmata.zip"))

module.exports = { container, files: Object.values(files) }
