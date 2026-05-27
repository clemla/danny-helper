import fs from "fs"
import path from "path"
import chokidar from "chokidar"
import type { Client } from "discord.js"

export default async (client: Client, dir: string) => {
	let events: Array<{ name: string; execute: (...args: any[]) => any }> = []

	async function scrap(folder: string) {
		for (const file of fs.readdirSync(folder)) {
			let full = path.resolve(folder, file)
			if (fs.statSync(full).isDirectory()) {
				await scrap(full)
				continue
			}

			if (![".js", ".ts"].some((ext) => file.endsWith(ext))) continue

			const ev = await import(full + `?update=${Date.now()}`)
			events.push(ev.default)
		}
	}
	await scrap(dir)

	events.forEach((ev) => {
	client.on(ev.name, (...args) =>
		ev.execute(client, ...args)
	);
});

	const watcher = chokidar.watch(dir, { persistent: true, ignoreInitial: true, usePolling: true, interval: 500 })

	// watcher.on("all", (ev, name, args) => {
	// 	console.log(ev, name)
	// })

	watcher.on("all", async (ev: string, name: string, args: any) => {
		if (![".js", ".ts"].some((ext) => name.endsWith(ext))) return

		const filePath = path.resolve(dir, name)

		switch (ev) {
			case "add": {
				const req = (await import(filePath + `?update=${Date.now()}`)).default
				events.push(req)
				const ev = events.find((e) => e.name === req.name)!

				console.log("Adding event")
				client.on(ev.name, (...args) => ev.execute(client, ...args))

				break
			}

			case "change": {
				const req = (await import(filePath + `?update=${Date.now()}`)).default
				const ev = events.find((e) => e.name === req.name)!
				ev.execute = req.execute

				break
			}
		}
	})
}
