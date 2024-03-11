import userCooldownData from "../database/json/schemas/Cooldowns/userCooldown.js";

/**
 * Checks if a user has used a command recently
 * @param {number} cooldown - The cooldown time in milliseconds
 * @returns {Promise<boolean>} Whether the user can use the command or not
 */
async function checkCooldown(interaction, cooldown, message) {
  let guildId = interaction.guild.id;
  let id;

  if (message) {
    id = interaction.author.id;
  } else {
    id = interaction.user.id;
  }

  const data = await userCooldownData.findData({ Guild: guildId, User: id });

  if (data) {
    const lastUsed = data.LastUsedData;
    const subtraction = Date.now() - lastUsed;

    if (subtraction > cooldown) {
      await userCooldownData.delete({ Guild: guildId, User: id });

      return false;
    } else {
      return true;
    }
  } else {
    userCooldownData.create({
      Guild: guildId,
      User: id,
      LastUsedData: Date.now(),
    });

    return false;
  }
}

export default checkCooldown;
