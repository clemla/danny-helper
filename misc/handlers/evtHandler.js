const fs = require("fs")
const path = require("path")
const chokidar = require("chokidar")

module.exports = async (client, dir) => {
	let events = []

	function scrap(folder) {
		fs.readdirSync(folder).forEach((file) => {
			let full = path.resolve(folder, file)
			if (fs.statSync(full).isDirectory()) return scrap(full)

			events.push(require(full))
		})
	}
	scrap(dir)

	events.forEach((ev) => {
		client.on(ev.name, (...args) => ev.execute(...args, client))
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
				events.push(req)
				const ev = events.find((e) => e.name === req.name)

				console.log("Adding event")
				client.on(ev.name, (...args) => ev.execute(...args, client))

				break
			}

			case "change": {
				delete require.cache[require.resolve(name)]
				const req = require(name)
				events.find((e) => e.name === req.name).execute = req.execute

				break
			}
		}
	})
}
