const { writeFileSync } = require("fs")
const { ActivityType } = require("discord.js")

module.exports = {
	name: "clientReady",

	/**
	 * @param {import('discord.js').Client} client
	 */

	execute: (client) => {
		console.log(`Logged in as ${client.user.tag} || ${client.user.id}`)

		function ApplyPresence() {
			client.user.setPresence({
				activities: [{ name: "Looking after helpless souls", type: ActivityType.Custom }],
				status: "online",
			})
		}

		ApplyPresence()
		setInterval(ApplyPresence, 20 * 60 * 1000)

		client.emit("refreshGames")
		setInterval(() => client.emit("refreshGames"), 15 * 60 * 1000)
	},
}
