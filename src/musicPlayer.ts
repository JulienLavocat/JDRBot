import { VoiceChannel, VoiceConnection } from "discord.js";
import ytdl from "ytdl-core";

export default class MusicPlayer {
	private voiceChannel: VoiceChannel | null;
	private connection: VoiceConnection | null;
	private queue: {
		title: string;
		url: string;
	}[];
	private volume: number;

	constructor() {
		this.voiceChannel = null;
		this.connection = null;
		this.queue = [];
		this.volume = 2;
	}

	play() {
		const song = this.queue.shift();
		if (!song) throw new Error("No song in queue");

		const dispatcher = this.connection
			?.play(ytdl(song.url))
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
		this.play();
	}

	async leave() {
		this.voiceChannel?.leave();
		this.voiceChannel = null;
		this.connection = null;
	}
}
