import loadFiles from "../../Functions/fileLoader.js";

async function loadCommands(client) {
  await client.commands.clear();

  const files = await loadFiles("src/commands");

  const commandsArray = [];

  //Promising all the files and looping through them and pushing them to commandsArray.
  await Promise.all(
    files.map(async (file) => {
      const command = await import(`file://${file}`);
      try {
        //Setting the command to the commandArray and setting it to client.commands
        commandsArray.push(command.default.data.toJSON());
        client.commands.set(command.default.data.name, command);
      } catch (err) {
        console.log(err);
      }
    })
  );

  return commandsArray;
}

export default loadCommands;
