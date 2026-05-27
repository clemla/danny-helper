import { Client } from "discord.js";
import type { ClientEvents } from "discord.js";

export type Event<K extends keyof ClientEvents> = {
	name: K;
	execute: (client: Client, ...args: ClientEvents[K]) => void | Promise<void>;
};