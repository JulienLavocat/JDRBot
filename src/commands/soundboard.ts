import { Message } from "discord.js";
import { musicPlayer } from "../bot";

const soundboard = {};

export default function (msg: Message) {
    musicPlayer.playSound("./sounds/fanta.mp3");
}
