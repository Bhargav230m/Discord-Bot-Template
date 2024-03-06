import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 * @param {String} emoji
 * @param {String} description
 * @param {Boolean} ephemeral
 */
async function reply(interaction, emoji, description, ephemeral) {
  //Replying
  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setDescription(`${emoji} | ${description}`)
        .setColor("Random")
        .setTimestamp(),
    ],
    ephemeral: ephemeral,
  });
}

export default reply;
