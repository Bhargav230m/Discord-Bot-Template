import { SlashCommandBuilder } from "discord.js";
import prefixData from "../../core/database/json/schemas/GuildPrefixes/prefix.js";
import config from "../../config.json" assert { type: "json" };
import editReply from "../../core/functions/editReply.js";

export default {
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
    //Defer reply the interaction
    await interaction.deferReply({ ephemeral: true });

    //Get the prefix from the options
    const prefix = interaction.options.getString("prefix");

    //Fetch the database
    const data = await prefixData.findData({ Guild: interaction.guild.id });

    //Initialize a empty message variable
    let message;

    if (data) {
      data.Prefix = prefix; //Set the prefix to the user input

      //Save the data
      await prefixData.save(data, { Guild: interaction.guild.id });

      //Set the message
      message = `Successfully updated the prefix to ${prefix}`;
    } else {
      //Create a new data in the database
      prefixData.create({ Guild: interaction.guild.id, Prefix: prefix });

      //Set the message
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
