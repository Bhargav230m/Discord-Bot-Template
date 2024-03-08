import { REST, Routes } from "discord.js";
import loadCommands from "./loadCommands.js";
import "colors";

async function registerSlashCommand(client) {
  console.log("Refreshing (/) command(s)".yellow);

  //Registering the commands
  const rest = new REST({ version: "10" }).setToken(process.env.token);
  const commands = await loadCommands(client);

  try {
    //Command data goes here
    await rest.put(Routes.applicationCommands(process.env.botId), {
      body: commands,
    });

    console.log("Successfully loaded (/) command(s)".green);
  } catch (error) {
    console.log("Failed to refresh (/) command(s)".red);
    console.error(error);
  }
}

export default registerSlashCommand;
