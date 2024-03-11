import { REST, Routes } from "discord.js";
import loadCommands from "./loadCommands.js";
import config from "../../../config.json" assert { type: "json" };
import "colors";

async function registerSlashCommand(client) {
  console.log("Refreshing (/) commands".yellow);

  //Registering the commands
  const rest = new REST({ version: "10" }).setToken(process.env.token);
  const commands = await loadCommands(client);

  try {
    let setup;
    if (config.commandSetup.globalCommands) {
      setup = Routes.applicationCommands(process.env.botId)
    } else {
      setup = Routes.applicationGuildCommands(process.env.botId, config.commandSetup.guildId)
    }

    //Command data goes here
    await rest.put(setup, {body: commands});

    console.log("Successfully reloaded (/) commands".green);
  } catch (error) {
    console.log("Failed to refresh (/) commands".red);
    console.error(error);
  }
}

export default registerSlashCommand;
