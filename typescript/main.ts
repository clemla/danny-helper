console.clear()

import "dotenv/config"
import path from "path"

import { Client, GatewayIntentBits } from "discord.js"
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})




// import cmdHandler from "@/misc/handlers/cmdHandler"
import evtHandler from "@/misc/handlers/evtHandler"
import watcher from "@/misc/handlers/watcher"

// cmdHandler(client, path.resolve(__dirname, "commands"))
evtHandler(client, path.resolve(__dirname, "events"))

watcher(path.resolve(__dirname, "misc", "messages"))

client.login(process.env.token)


export default client