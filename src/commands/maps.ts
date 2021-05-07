import { Message } from "discord.js";
import * as utils from "../utils";

const MAP_URL = "";

export default function (msg: Message) {
	msg.reply(
		`La map est actuellement disponible a cette addresse en rejoignant la room "jdr"\n<http://maps.jdr.indiebackend.com/>`
	);
}
