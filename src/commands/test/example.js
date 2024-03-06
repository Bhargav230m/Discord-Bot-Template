import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import ms from "ms";

export default {
  developer: true,
  cooldown: ms("5s"),
  data: new SlashCommandBuilder()
    .setName("example")
    .setDescription("Example command!"),
  async execute(interaction, client) {
  },
};