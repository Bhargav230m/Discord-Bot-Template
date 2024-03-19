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
    // Getting the interaction's custom ID
    if (interaction.customId) {
      const component = client.components.get(interaction.customId); // Getting the component with the given custom ID

      if (!component) {
        return reply(
          interaction.customId,
          config.messageConfig.globalEmojis.cross,
          "This component doesn't exist",
          true
        ); // Replying with an error if the component doesn't exist
      }

      await validateUser(component, interaction, client)
    }
  },
};
