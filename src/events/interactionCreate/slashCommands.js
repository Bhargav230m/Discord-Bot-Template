import { ChatInputCommandInteraction, Client } from "discord.js";
import config from "../../config.json" assert { type: "json" };
import reply from "../../core/functions/reply.js";
import validateUser from "../../core/functions/validateUser.js"; 

export default {
  name: "interactionCreate",

  /**
   * The function that is executed when the event is triggered
   * @param {ChatInputCommandInteraction} interaction - The interaction that triggered the event
   * @param {Client} client - The Discord.js client
   */
  async execute(interaction, client) {
    // Checking if the interaction is a command or not
    if (!interaction.isCommand()) return;

    // Getting the command from the collection
    const command = client.commands.get(interaction.commandName);

    // Returning an error message if the command was not found in the commands cache
    if (!command) {
      await reply(
        interaction,
        config.messageConfig.x,
        "This command doesn't exist",
        true
      );
      return;
    }

    // Validating the user
    await validateUser(command, interaction, client); // Validating the user and executing the command
  },
};