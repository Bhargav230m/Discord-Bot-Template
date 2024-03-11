import config from "../../config.json" assert { type: "json" }; // Importing the configuration file
import reply from "./reply.js"; // Importing the reply function

/**
 * Checks if the user is a developer
 */
function checkForDeveloper(interaction, message) {
  let idArray = config.developers.id; // The array of developer IDs
  let usernameArray = config.developers.username; // The array of developer usernames

  let userId;
  let userName;

  if (message) {
    userId = interaction.author.id;
    userName = interaction.author.username;
  } else {
    userId = interaction.user.id;
    userName = interaction.user.username;
  }

  let foundId = idArray.find((i) => userId === i); // Checking if the user's ID is in the array
  let foundUserName = usernameArray.find((i) => userName === i); // Checking if the user's username is in the array

  if (foundId || foundUserName) {
    return false;
  } else return true;
}

export default checkForDeveloper;
