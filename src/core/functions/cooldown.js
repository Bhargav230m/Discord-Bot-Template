import { CommandInteraction } from "discord.js";
import client from "../system/client/client.js";

/**
 * Checks if a user has used a command recently
 * @param {CommandInteraction} interaction - The interaction
 * @param {number} cooldown - The cooldown time in milliseconds
 * @param {boolean} message - Whether interaction is messageCreate or not
 * @param {client} client - The discord.js client
 * @returns {Promise<boolean>} Whether the user can use the command or not
 */
async function checkCooldown(interaction, cooldown, message, client) {
  let guildId = interaction.guild.id;
  let userId;

  //If interaction is messageCreate then we need to get the userId differently
  if (message) userId = interaction.author.id;
  else userId = interaction.user.id;

  const cooldownData = client.cooldown.get(userId); //Get the cooldown data from the client.cooldown collection

  if (cooldownData) {
    const lastUsed = cooldownData.LastUsed;
    const subtraction = Date.now() - lastUsed;

    if (subtraction > cooldown) {
      client.cooldown.delete(userId); //Delete the cooldown data from the client.cooldown collection

      return false;
    } else return true;
  } else {
    let cooldownObject = {
      Guild: guildId,
      LastUsed: Date.now(),
    };

    client.cooldown.set(userId, cooldownObject); //Set the cooldown data to client.cooldown collection with key userId
  }
}

export default checkCooldown;
