import { Message } from "discord.js";
import * as utils from "../utils";

export default function (msg: Message) {
	const args = msg.content.split(process.env.PREFIX + "d");

	const value = parseInt(args[1]);
	if (isNaN(value))
		return msg.reply(" La valeur du dé doit être un nombre !");

	const random = utils.randomRange(1, value);
	msg.reply(utils.getRollDiceMessage(random, value));
}
