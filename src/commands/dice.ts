import { Message } from "discord.js";
import * as utils from "../utils";

export default function (msg: Message) {
	const args = msg.content.split(process.env.PREFIX + "d")[1].split(" ");
	const value = parseInt(args[0]);
	if (isNaN(value))
		return msg.reply(
			" La valeur du dé doit être un nombre entre 1 et 10 !"
		);

	let throws = 1;
	if (args.length >= 2) {
		const amount = parseInt(args[1]);
		throws = isNaN(amount) ? 1 : Math.max(amount, 1);
	}

	if (throws > 10)
		return msg.reply(
			" La valeur du dé doit être un nombre entre 1 et 10 !"
		);
	for (let i = 0; i < throws; i++) {
		msg.reply(utils.getRollDiceMessage(utils.randomRange(1, value), value));
	}
}
