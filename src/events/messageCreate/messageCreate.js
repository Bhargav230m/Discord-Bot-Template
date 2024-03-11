import { Message, Client } from "discord.js"; // Importing required modules
import config from "../../config.json" assert { type: "json" }; // Importing the configuration file
import validateUser from "../../core/functions/validateUser.js"; // Importing the validateUser function
import prefixData from "../../core/database/json/schemas/GuildPrefixes/prefix.js";

export default {
  name: "messageCreate", // The name of the event

  /**
   * The function that is executed when the event is triggered
   * @param {Message} message - The message that triggered the event
   * @param {Client} client - The Discord.js client
   */
  async execute(message, client) {
    if(message.author.bot) return;

    //Find the data in the database
    const data = await prefixData.findData({ Guild: message.guild.id })

    //Create a empty prefix var
    let prefix;

    if(data) {
        prefix = data.Prefix // The prefix is now the datbase
    } else {
        prefix = config.messageConfig.default_prefix;
    }

    if(message.content.startsWith(prefix)) {
        //Slice the prefix from the command
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        //Get the command from the collection
        const command = client.prefix_commands.get(cmd);

        if(!command) return; //No command found then return nothing

        //Validate the user
        await validateUser(command, message, client, true, args);
    }
  },
};
