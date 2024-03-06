import { ChatInputCommandInteraction } from "discord.js"; // Importing the required module
import config from "../../config.json" assert { type: "json" }; // Importing the configuration file
import reply from "./reply.js"; // Importing the reply function

/**
 * Checks if the user is a developer
 * @param {ChatInputCommandInteraction} interaction - The interaction that triggered the event
 */
function checkForDeveloper(interaction) {
  let idArray = config.developers.id; // The array of developer IDs
  let usernameArray = config.developers.username; // The array of developer usernames

  let foundId = idArray.find((i) => interaction.user.id === i); // Checking if the user's ID is in the array
  let foundUserName = usernameArray.find(
    (i) => interaction.user.username === i
  ); // Checking if the user's username is in the array

  if (!foundId || !foundUserName) {
    return false;
  } else return true;
}

export default checkForDeveloper;