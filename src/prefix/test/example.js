import { Client, Message } from "discord.js";
import ms from "ms";

export default {
  developer: true,
  cooldown: ms("5s"),
  name: "example",
  aliases: ["ex", "exp"], //... more aliases

  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {},
};
