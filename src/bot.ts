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

let hasBeenUsed = false;

client.on("message", (msg) => {
	if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

	const cmd = msg.content.slice(1);

	if (cmd.startsWith("map")) return maps(msg);
	if (cmd.startsWith("dc")) return hiddenDice(msg);
	if (cmd.startsWith("d")) return dice(msg);
	if (cmd.startsWith("m")) return music(msg);
	if (cmd.startsWith("s")) return soundboard(msg);

	if (cmd.startsWith("fk")) {
		if (
			[
				"239084246566699008",
				"695704110745387070",
				"151044810906664960",
			].includes(msg.author.id)
		)
			msg.reply(
				"\n**Équipe 1:**\nJulien - Joari - Bastien\n**Équipe 2:**\nFafa - Matthieu - Ghost"
			);
		else {
			if (!hasBeenUsed) {
				msg.reply(
					"\n**Équipe 1:**\nJulien - Joari - Bastien\n**Équipe 2:**\nFafa - Matthieu - Ghost"
				);
				hasBeenUsed = true;
				return;
			}

			const teams = [
				"Julien",
				"Joari",
				"Bastien",
				"Fafa",
				"Matthieu",
				"Ghost",
			].sort(() => 0.5 - Math.random());

			msg.reply(
				`\n**Équipe 1:**\n${teams[0]} - ${teams[1]} - ${teams[2]}\n**Équipe 2:**\n${teams[3]} - ${teams[4]} - ${teams[5]}`
			);
		}
	}
});

export const connect = () => client.login(process.env.DISCORD_TOKEN);
export { musicPlayer };
