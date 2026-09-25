const {
	ButtonBuilder,
	ButtonStyle,
	ContainerBuilder,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} = require("discord.js")

const color = [218, 165, 32]

const container = new ContainerBuilder().setAccentColor(color)
const sep = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
const sep2 = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)

const TitleLines = [
	"# :crown: Apex donation",
	"### Own a Denuvo game? You can help us out by donating",
	"-# The rules changed for new donors, please read this before you DM us",
]
const TitleSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(TitleLines.join("\n")))
	.setThumbnailAccessory(
		new ThumbnailBuilder().setURL(`https://cdn.discordapp.com/avatars/1469746513780543655/92ae9c03303549487b788f987063335b.webp?size=1024`),
	)

const BenefitsLines = [
	"## :gift: Benefits",
	"- Lifetime access to D-games (1 year if the donation isn't a AAA game)",
	"- No cooldown between activations",
	"- Special tickets to request games that ran out of keys",
]
const BenefitsText = new TextDisplayBuilder().setContent(BenefitsLines.join("\n"))

const RulesLines = [
	"## :rotating_light: New rules",
	"- **We don't take family accounts anymore.** If you bought a game on your main and want to share it with us through Steam Family, please don't DM us about it.",
	"- The easiest way now is a **global Steam key** of the game, but it's not the only option. For other ways to donate, DM <@503862212679696394> or <@817402736232103976>.",
	"- No cracked games. It has to be an uncracked game released **this year**, games from previous years won't be accepted.",
]
const RulesText = new TextDisplayBuilder().setContent(RulesLines.join("\n"))

const GuideLines = [
	"## :gear: How to donate",
	"Willing to donate a Denuvo game? DM <@503862212679696394> or <@817402736232103976>",
	"- **Global Steam key:** buy a key of the game and DM it to either one of them",
	"-# Hit **Find cheapest key**, type the game's AppID and it'll show you the cheapest keys from every store",
	"- **Other options:** no global key? DM them and they'll tell you the other ways you can donate",
]
const GuideSec = new SectionBuilder()
	.addTextDisplayComponents(new TextDisplayBuilder().setContent(GuideLines.join("\n")))
	.setButtonAccessory(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Find cheapest key").setCustomId("apex-price"))

const OldDonorsText = new TextDisplayBuilder().setContent(
	"-# Already an Apex donor? Nothing changes for you, this only applies to new donors. Thanks for the support <3",
)

container.addSectionComponents(TitleSec)
container.addSeparatorComponents(sep)
container.addTextDisplayComponents([BenefitsText])
container.addSeparatorComponents(sep2)
container.addTextDisplayComponents([RulesText])
container.addSeparatorComponents(sep2)
container.addSectionComponents([GuideSec])
container.addSeparatorComponents(sep2)
container.addTextDisplayComponents([OldDonorsText])

// Specific sections
const specifics = {
	requirement: { container: new ContainerBuilder().setAccentColor(color).addTextDisplayComponents([RulesText, OldDonorsText]), files: [] },
	benefits: { container: new ContainerBuilder().setAccentColor(color).addTextDisplayComponents([BenefitsText]), files: [] },
	guide: { container: new ContainerBuilder().setAccentColor(color).addSectionComponents([GuideSec]), files: [] },
}

module.exports = { container, files: [], specifics }
