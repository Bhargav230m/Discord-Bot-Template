import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import humanize from "../../Core/Functions/humanize.js";
import ms from "ms";

export default {
  developer: true,
  cooldown: ms("5s"),
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with info about websocket and latency!"),
  async execute(interaction, client) {
    //Defer replying to get the latency of the connection
    const reply = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    //Doing a followUp and replying with information
    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: "🏓 Pong!",
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .addFields(
            {
              name: "`🔌` Websocket",
              value: `\`${client.ws.ping} ms\``,
              inline: true,
            },
            {
              name: "`📧` Latency",
              value: `\`${
                reply.createdTimestamp - interaction.createdTimestamp
              } ms\``,
              inline: true,
            },
            {
              name: "`🕙` Uptime",
              value: `\`${humanize(client.uptime)}\``,
              inline: true,
            }
          )
          .setColor("Random"),
      ],
    });
  },
};
