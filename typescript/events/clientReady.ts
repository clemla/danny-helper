import { ActivityType } from "discord.js"
import type { Event } from "@/types/Event"


const event: Event<"clientReady"> = {
	name: "clientReady",

	execute: (client) => {
		if (!client.user) return

		console.log(`Logged in as ${client.user.tag} || ${client.user.id}`)

		client.user.setPresence({
			activities: [{ name: "Looking after helpless souls", type: ActivityType.Custom }],
			status: "online",
		})
	},
}

export default event