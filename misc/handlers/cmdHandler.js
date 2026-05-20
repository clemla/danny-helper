const fs = require("fs")
const path = require("path")
const { Routes, REST } = require("discord.js")
const chokidar = require("chokidar")

module.exports = async (client, dir) => {
	let commands = []

	function scrap(folder) {
		fs.readdirSync(folder).forEach((file) => {
			let full = path.resolve(folder, file)
			if (fs.statSync(full).isDirectory()) return scrap(full)

			commands.push(require(full))
		})
	}
	scrap(dir)

	if (!client.user) await new Promise((resolve) => client.on("clientReady", resolve))

	const rest = new REST({ version: "10" }).setToken(client.token)
	await rest.put(Routes.applicationCommands(client.user.id), { body: commands.map((cmd) => cmd.command) })

	client.on("interactionCreate", (int) => {
		if (!int.isChatInputCommand()) return

		const cmd = commands.find((cmd) => cmd.command.name === int.commandName)
		if (!cmd) return int.reply({ content: "Command not found somehow.", flags: [64] })

		let args = cmd.args ? cmd.args(int) : []
		if (typeof args !== "object") args = [args]

		args = Array.isArray(args) ? args : []
		cmd.execute(int, client, ...args)
	})

	const watcher = chokidar.watch(dir, { persistent: true, ignoreInitial: true, usePolling: true, interval: 500 })

	// watcher.on("all", (ev, name, args) => {
	// 	console.log(ev, name)
	// })

	watcher.on("all", async (ev, name, args) => {
		if (!name.endsWith(".js")) return

		switch (ev) {
			case "add": {
				const req = require(name)
				if (typeof req !== "object" || !req.command || !req.execute) return

				commands[req.command.name] = { args: req.args, execute: req.execute }
				files[name] = req.command.name
				await rest.post(Routes.applicationCommands(client.user.id), { body: req.command })
				console.log("Added command", req.command.name)

				break
			}

			case "change": {
				delete require.cache[require.resolve(name)]
				const { execute, command, args } = require(name)

				commands.find((c) => c.command.name === command.name).execute = execute
				commands.find((c) => c.command.name === command.name).args = args

				break
			}
		}
	})
}
