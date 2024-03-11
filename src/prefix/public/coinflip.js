import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
  Message,
} from "discord.js";
import ms from "ms";
import config from "../../config.json" assert { type: "json" };
import editReply from "../../core/functions/editReply.js";

export default {
  cooldown: ms("5s"),
  name: "coinflip",
  aliases: ["cf", "coinfl", "cflip", "cofl", "coinf"],

  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    //Heads and Tails
    let buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Flip")
        .setCustomId("f")
        .setStyle(ButtonStyle.Primary)
    );

    //Construct a embed
    const embed = new EmbedBuilder()
      .setAuthor({
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
        name: "CoinFlip",
      })
      .setDescription("A game of coinflip has begin choose your option")
      .setTimestamp()
      .setColor("Random")
      .setFooter({ text: "Made with ❤️ by Bhargav230m" });

    //Reply
    const msg = await message.reply({ embeds: [embed], components: [buttons] });

    //Create a collector
    const collector = msg.createMessageComponentCollector({
      filter: (button) => button.user.id === message.author.id,
      time: 60000,
    });

    //Listen for interactions
    collector.on("collect", async (interaction) => {
      if (interaction.customId === "f") {
        buttons.components[0].setDisabled(true);

        //Defer reply the interaction
        await interaction.deferReply({ ephemeral: true });

        //Pick a random choice
        let randomChoice = ["Heads", "Tails"];
        let randomNumber = Math.floor(Math.random() * randomChoice.length);

        //Reply with success message
        await editReply(
          interaction,
          config.messageConfig.globalEmojis.tick,
          "Flipped the coin!",
          true
        );

        //Update da old msg
        msg.edit({
          embeds: [
            embed.setDescription(
              `The output was ${randomChoice[randomNumber]}`
            ),
          ],
          components: [buttons],
        });

        collector.stop();
      }
    });

    collector.on("end", () => {
      buttons = buttons.components[0].setDisabled(true);
      msg.edit({
        embeds: [embed.setDescription("Uh Oh!, You didn't flip on time")],
        components: [buttons],
      });
    });
  },
};
