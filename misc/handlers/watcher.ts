import fs from "fs"
import path from "path"
import chokidar from "chokidar"

export default async (dir: string) => {
	function scrap(folder: string) {
		fs.readdirSync(folder).forEach(async (file) => {
			let full = path.resolve(folder, file)
			if (fs.statSync(full).isDirectory()) return scrap(full)

			await import(full + `?update=${Date.now()}`)
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

	watcher.on("all", async (ev: string, name: string, args: any) => {
		try {
			if (![".js", ".ts"].some((ext) => name.endsWith(ext))) return

			const filePath = path.resolve(dir, name)

			switch (ev) {
				case "add": {
					await import(filePath + `?update=${Date.now()}`)
					break
				}

				case "change": {
					await import(filePath + `?update=${Date.now()}`)
					break
				}

				case "unlink": {
					break
				}
			}
		} catch (err) {
			console.error("Failed hot reload: ", name, err)
		}
	})
}
