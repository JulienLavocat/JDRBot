import { config } from "dotenv";
config();

import { Client } from "discord.js";
import dice from "./commands/dice";
import hiddenDice from "./commands/hiddenDice";
import music from "./commands/music";
import soundboard from "./commands/soundboard";
import MusicPlayer from "./musicPlayer";
import maps from "./commands/maps";

const PREFIX = process.env.PREFIX || "!";
const client = new Client();
const musicPlayer = new MusicPlayer();

client.on("message", (msg) => {
	if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

	const cmd = msg.content.slice(1);

	if (cmd.startsWith("map")) return maps(msg);
	if (cmd.startsWith("dc")) return hiddenDice(msg);
	if (cmd.startsWith("d")) return dice(msg);
	if (cmd.startsWith("m")) return music(msg);
	if (cmd.startsWith("s")) return soundboard(msg);
});

export const connect = () => client.login(process.env.DISCORD_TOKEN);
export { musicPlayer };
