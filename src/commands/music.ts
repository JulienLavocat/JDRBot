import { Message } from "discord.js";
import MusicPlayer from "../musicPlayer";

const INVALID_USAGE =
	"Commande invalide, utilisez: `!m [stop | skip | add | pause | list | start]`";

const player = new MusicPlayer();

const handlers: { [cmd: string]: (msg: Message, args: string[]) => void } = {
	stop: (msg, args) => {
		player.stop();
	},
	skip: (msg, args) => {
		try {
			player.play();
		} catch (error) {
			msg.reply(error.message);
		}
	},
	add: async (msg, args) => {
		const url = args.slice(1).join(" ").replace("<", "").replace(">", "");
		const song = await player.add(url);
		msg.reply(`\`${song.title}\` ajouté a la file d'attente !`);
	},
	pause: (msg, args) => {
		player.pause();
	},
	list: (msg, args) => {
		const songs = player.list();
		if (songs.length === 0)
			return msg.reply("La liste d'attente est vide.");

		msg.reply("\n" + songs.map((element) => "  - " + element.title + "\n"));
	},
	join: (msg, args) => {
		const voiceChannel = msg.member?.voice.channel;
		if (!voiceChannel)
			return msg.reply(
				"Tu doit être dans un canal vocal pour lancer la musique !"
			);

		try {
			player.join(voiceChannel);
		} catch (error) {
			msg.reply(error.message);
		}
	},
	leave: (msg, args) => {
		player.leave();
	},
};

export default function music(msg: Message) {
	const args = msg.content.trim().split(" ").slice(1);
	if (args.length < 1) return msg.reply(INVALID_USAGE);

	const handler = handlers[args[0]];
	return handler ? handler(msg, args) : msg.reply(INVALID_USAGE);
}
