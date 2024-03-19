import { SlashCommandBuilder } from "discord.js";
import prefixData from "../../core/database/mongodb/schemas/Prefix/prefix.js";
import config from "../../config.json" assert { type: "json" };
import editReply from "../../core/functions/editReply.js";
import ms from "ms";

export default {
  cooldown: ms("10s"),
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Set a prefix for prefix commands")
    .addStringOption((options) =>
      options
        .setName("prefix")
        .setDescription("Enter a prefix for prefix commands")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const prefix = interaction.options.getString("prefix");
    const data = await prefixData.findOne({ Guild: interaction.guild.id });
    let message;

    if (data) {
      data.Prefix = prefix;
      await data.save();

      message = `Successfully updated the prefix to ${prefix}`;
    } else {
      //Create a new data in the database
      new prefixData({
        Guild: interaction.guild.id,
        Prefix: prefix,
      }).save();

      message = `Successfully created a new data in the database, Now prefix is ${prefix} instead of ${config.messageConfig.default_prefix}`;
    }

    //Return the message
    await editReply(
      interaction,
      config.messageConfig.globalEmojis.tick,
      message,
      true
    );
  },
};
