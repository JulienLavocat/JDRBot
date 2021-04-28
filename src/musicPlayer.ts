import { VoiceBroadcast, VoiceChannel, VoiceConnection } from "discord.js";
import ytdl from "ytdl-core";
import { Readable } from "stream";

export class AudioStream extends Readable {
	_read() {}
}

export default class MusicPlayer {
	private voiceChannel: VoiceChannel | null;
	private connection: VoiceConnection | null;
	private queue: {
		title: string;
		url: string;
	}[];
	private volume: number;
	private musicStream: Readable | null;
	private soundStream: Readable | null;

	constructor() {
		this.voiceChannel = null;
		this.connection = null;
		this.queue = [];
		this.volume = 2;
		this.musicStream = null;
		this.soundStream = null;
	}

	play() {
		console.log(this.queue);

		const song = this.queue.shift();
		if (!song) throw new Error("No song in queue");

		this.musicStream = ytdl(song.url);

		const dispatcher = this.connection
			?.play(this.musicStream)
			.on("finish", () => {
				try {
					this.play();
				} catch (error) {
					console.log(error);
				}
			})
			.on("error", (error) => console.error(error));

		if (!dispatcher) throw new Error("Unable to instantiate dispatcher");

		dispatcher.setVolumeLogarithmic(this.volume / 5);
	}
	stop() {
		this.connection?.dispatcher.end();
		this.queue = [];
	}
	async add(url: string) {
		const songInfo = await ytdl.getInfo(url);
		const song = {
			title: songInfo.videoDetails.title,
			url,
		};

		this.queue.push(song);
		console.log(this.queue);

		return song;
	}
	pause() {
		if (this.connection?.dispatcher.paused)
			this.connection?.dispatcher.resume();
		else this.connection?.dispatcher.pause();
	}
	list() {
		return this.queue;
	}
	async join(channel: VoiceChannel) {
		this.voiceChannel = channel;
		this.connection = await this.voiceChannel.join();
	}

	async leave() {
		this.voiceChannel?.leave();
		this.voiceChannel = null;
		this.connection = null;
	}

	async playSound(sound: string) {
		if (this.musicStream) {
			this.musicStream.pause();
		}

		this.connection?.play(sound).on("finish", () => {
			if (this.musicStream) this.connection?.play(this.musicStream);
			this.musicStream?.resume();
		});
	}
}
