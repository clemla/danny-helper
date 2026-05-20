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

const instantGamingLink = "https://www.instant-gaming.com/?igr=gamer-2b49df"
const color = [218, 165, 32]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = ["# :grey_question: Apex donation guide (Method 2)", "Follow EVERY step!", "-# Thanks for considering donating <3"]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL("https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024"),
	)

const Lines = [
	"- Create a steam family on the account OWNING the game.",
	"  - Let's now populate this family with new accounts.",
	"- Go on [SimpleLogin](<https://app.simplelogin.io/auth/register>) and create an account with a permanent email.",
	"- Repeat the following steps for each account you want to add to the family:",
	"  - Create an alias on [SimpleLogin](<https://app.simplelogin.io/dashboard/custom_alias>).",
	"  - Create a new [steam account](<https://store.steampowered.com/join/>) with the __alias email__.",
	"- Add as much accounts as you can to the family:",
	"  - Have the owner account as a contact on steam",
	'  - How ? Generate a "Quick Invite" link from the owner account. Open it in the browser and add contact.',
	'  - On the family management page click "Invite a member" and add the new accounts.',
	"  - Join the family using the link given by mail (all alias mails go in your MAIN inbox).",
	"- :warning: Turn off [2FA/SteamGuard FULLY](<https://store.steampowered.com/twofactor/manage/>) on ALL accounts you will share (confimation in email).",
	"\n- :tada: You can now DM one of the previsouly mentionned users to send them:",
	"  - A list of the DENUVO protected games you have on the accounts.",
	"  - The accounts USERNAME and PASSWORD (not mail, just the username. Don't use personnal password just in case).",
]
const StepsText = new TextDisplayBuilder().setContent(Lines.join("\n"))

const RulesLines = [
	"## :rotating_light: What to do after !",
	"- Do NOT change the password or username. (Or tell us beforehand)",
	"- Do NOT turn back on 2FA/SteamGuard unless we can't automatically log in.",
	"- Do NOT start the game from the donated accounts",
	"  - You can use your UNSHARED main account for this.",
	"- Along with the line above, do NOT share same accounts to other servers",
	"  - Every ACCOUNT has a DAILY limit of 5 keys per day.",
	"  - Only way to know the amount left is by manually counting everytime we use one, so sharing isn't practical.",
	"- Finally if you bought new denuvo games for the steam family, let us know so we can add them to the list <3 !",
]
const RulesText = new TextDisplayBuilder().setContent(RulesLines.join("\n"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(StepsText)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents(RulesText)

// Files

const files = {}

files["Guide.mp4"] = new AttachmentBuilder().setName("Guide.mp4").setFile(fs.readFileSync("misc/assets/Guide.mp4"))

module.exports = { container, files: Object.values(files) }
