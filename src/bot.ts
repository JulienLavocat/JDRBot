import { Client } from "discord.js";
import dice from "./commands/dice";
import hiddenDice from "./commands/hiddenDice";
import music from './commands/music';

const PREFIX = process.env.PREFIX || "!";

const client = new Client();

client.on("message", (msg) => {
  if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

  const cmd = msg.content.slice(1);

  if (cmd.startsWith("dc")) return hiddenDice(msg);
  if (cmd.startsWith("d")) return dice(msg);
  if(cmd.startsWith("m")) return music(msg);
});

export const connect = () => client.login(process.env.DISCORD_TOKEN);
