import { Collection, EmbedBuilder } from "discord.js"; // Importing required modules
import checkForDeveloper from "./developerOnly.js";
import config from "../../config.json" assert { type: "json" }; // Importing the configuration file
import reply from "./reply.js"; // Importing the reply function
import editReply from "./editReply.js"; // Importing the editReply function
import checkCooldown from "./cooldown.js";
import humanize from "./humanize.js";

/**
 * Validates the user
 * @param {Collection} collection - The collection of commands
 * @param {Client} client - The Discord.js client
 */
async function validateUser(collection, interaction, client, prefix, args) {
  let results1; // The results of the checks
  let results2;
  let message; // The tag of the user (e.g. "developer")

  if (collection.default.developer) {
    results1 = checkForDeveloper(interaction, prefix); // Checking if the user is a developer
    if (results1) {
      message = "You are not a developer to use this command"; // Setting the tag to "developer"
    }
  }

  if (collection.default.cooldown) {
    results2 = await checkCooldown(
      interaction,
      collection.default.cooldown,
      prefix
    );
    if (results2) {
      message = `Please wait ${humanize(
        collection.default.cooldown
      )}, before using the command again.`;
    }
  }

  if (results1 || results2) {
    if (!prefix) {
      if (interaction.deferred) {
        return errorMessage(interaction, tag, editReply); // Editing the reply if the interaction is deferred
      } else {
        return errorMessage(interaction, message, reply); // Replying with an error message if the interaction is not deferred
      }
    } else {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${config.messageConfig.globalEmojis.cross} | ${message}`
            )
            .setTimestamp(),
        ],
      });
    }
  } else {
    // Executing the collection
    collection.default.execute(interaction, client, args); // Executing the collection
  }
}

/**
 * Sends an error message to the user if they are not a developer
 * @param {ChatInputCommandInteraction} interaction - The interaction that triggered the event
 * @param {String} tag - The tag of the user (e.g. "developer")
 * @param {Function} reply - The function used to reply to the user
 */
function errorMessage(interaction, tag, reply) {
  reply(interaction, config.messageConfig.globalEmojis.cross, tag, true);
}

export default validateUser;
