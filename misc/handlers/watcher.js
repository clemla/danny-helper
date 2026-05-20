const fs = require("fs")
const path = require("path")
const chokidar = require("chokidar")

module.exports = async (dir) => {
	let files = []

	function scrap(folder) {
		fs.readdirSync(folder).forEach((file) => {
			let full = path.resolve(folder, file)
			if (fs.statSync(full).isDirectory()) return scrap(full)

			files.push(require(full))
		})
	}
	scrap(dir)

	const watcher = chokidar.watch(dir, { persistent: true, ignoreInitial: true, usePolling: true, interval: 500 })

	process.on("unhandledRejection", (err) => {
		console.error("Unhandled rejection: ", err)
	})

	process.on("uncaughtException", (err) => {
		console.error("Uncaught exception: ", err)
	})

	// watcher.on("all", (ev, name, args) => {
	// 	console.log(ev, name)
	// })

	watcher.on("all", async (ev, name, args) => {
		try {
			if (!name.endsWith(".js")) return

			switch (ev) {
				case "add": {
					require(name)
					break
				}

				case "change": {
					delete require.cache[require.resolve(name)]
					require(name)
					break
				}

				case "unlink": {
					delete require.cache[require.resolve(name)]
					break
				}
			}
		} catch (err) {
			console.error("Failed hot reload: ", name, err)
		}
	})
}
