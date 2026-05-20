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

const TitleLines = [
	"# :crown: Apex donation",
	"### Own a denuvo game ? You can help us by donating",
	"-# Both methods take 2 or 10 minutes, as fast than easy yes ;)",
]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL(`https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024`),
	)

const BenefitsLines = [
	"## :gift: Benefits",
	"- Lifetime access to D-games (for 1 year if donation isn't AAA game)",
	"- No cooldown between activations",
	"- Special tickets to request games that ran out of keys",
]
const BenefitsText = new TextDisplayBuilder().setContent(BenefitsLines.join("\n"))

const RequirementLines = [
	"## :rotating_light: Must own the game !",
	"- Make sure that you bought the game legitimately !",
	"- Only FULL ACCESS accounts will be accepted (no shared/offline accounts)",
]
const RequirementSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(RequirementLines.join("\n")))
	.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Cheaper & safe games").setURL(instantGamingLink))

const GuideLines = [
	"## :gear: How to donate ?",
	"-# Method 1: `2mins` | Method 2: `about 10mins`",
	":one: Donate enough money to buy the game or send us a game key",
	`-# From [instant-gaming](<${instantGamingLink}>) for example`,
	":two: Give us family shared accounts details",
	"-# Video guide below | Text guide on the right",
	"- Send accounts or game key to ONE of those:",
	"  - <@503862212679696394> <@780553392354361344> <@868170669412745216>",
]
const GuideSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(GuideLines.join("\n")))
	.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Written guide").setCustomId("apex-guide"))
const GuidePic = new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL("attachment://Guide.mp4").setDescription("Video Guide"))

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents([BenefitsText])
container.addSeparatorComponents(sep2)
container.addSectionComponents([RequirementSec])
container.addSeparatorComponents(sep2)
container.addSectionComponents([GuideSec])
container.addMediaGalleryComponents([GuidePic])

// Files

const files = {}

files["Guide.mp4"] = new AttachmentBuilder().setName("Guide.mp4").setFile(fs.readFileSync("misc/assets/Guide.mp4"))

// Specific sections
const specifics = {
	requirement: { container: new ContainerBuilder().setAccentColor(color).addSectionComponents([RequirementSec]), files: [] },
	benefits: { container: new ContainerBuilder().setAccentColor(color).addTextDisplayComponents([BenefitsText]), files: [] },
	guide: {
		container: new ContainerBuilder().setAccentColor(color).addSectionComponents([GuideSec]).addMediaGalleryComponents([GuidePic]),
		files: [files["Guide.mp4"]],
	},
}

module.exports = { container, files: Object.values(files), specifics }
