const fs = require("fs")
const path = require("path")
const chokidar = require("chokidar")

module.exports = async (client, dir) => {
	// Keyed by file path: most events share the name "interactionCreate",
	// so looking them up by name reloaded the wrong handler.
	const events = new Map()

	function register(file) {
		const ev = require(file)
		events.set(file, ev)
		client.on(ev.name, (...args) => events.get(file).execute(...args, client))
	}

	function scrap(folder) {
		fs.readdirSync(folder).forEach((file) => {
			let full = path.resolve(folder, file)
			if (fs.statSync(full).isDirectory()) return scrap(full)

			register(full)
		})
	}
	scrap(dir)

	const watcher = chokidar.watch(dir, { persistent: true, ignoreInitial: true, usePolling: true, interval: 500 })

	// watcher.on("all", (ev, name, args) => {
	// 	console.log(ev, name)
	// })

	watcher.on("all", async (ev, name, args) => {
		if (!name.endsWith(".js")) return

		const file = path.resolve(name)

		switch (ev) {
			case "add": {
				if (events.has(file)) break

				console.log("Adding event")
				register(file)

				break
			}

			case "change": {
				delete require.cache[require.resolve(file)]
				const req = require(file)
				if (events.has(file)) events.get(file).execute = req.execute
				else register(file)

				break
			}
		}
	})
}
