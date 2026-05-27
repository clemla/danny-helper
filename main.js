console.clear()
require("dotenv").config({ quiet: true })
require("module-alias/register")
const path = require("path")

const { Client, GatewayIntentBits } = require("discord.js")
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

require("misc/handlers/cmdHandler")(client, path.resolve(__dirname, "commands"))
require("misc/handlers/evtHandler")(client, path.resolve(__dirname, "events"))

require("misc/handlers/watcher")(path.resolve(__dirname, "misc", "messages"))
require("misc/handlers/watcher")(path.resolve(__dirname, "misc", "functions"))
require("misc/handlers/watcher")(path.resolve(__dirname, "misc", "game_list.json"))

const args = process.argv.slice(2)
const isDev = args.includes("-dev")

client.login(process.env[isDev ? "token_dev" : "token"])
module.exports = client
