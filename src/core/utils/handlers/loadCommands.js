import load from "./load.js";

/**
 * Set commands to the client collection and return a array of commands data
 * @param {any} command 
 * @param {import("discord.js").Client} client 
 * @returns 
 */
function setCommands(command, client) {
  const commandsArray = [];

  //Push all the data to the commands array
  commandsArray.push(command.default.data.toJSON());
  //Set the commands to the client.commands
  client.commands.set(command.default.data.name, command);

  return commandsArray;
}

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns 
 */
async function loadCommands(client) {
  //Load the commands
  const data = await load(
    "commands",
    client.commands,
    "src/commands",
    setCommands,
    client
  );

  //Return the data
  return data;
}

export default loadCommands;
