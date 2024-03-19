import loadFiles from "../../Functions/fileLoader.js";
import "colors";

async function loadPrefixCommands(client) {
  await client.prefix_commands.clear();

  const files = await loadFiles("src/prefix");
  console.log("Refreshing prefix commands".yellow);

  //Promising all the files and looping through them and pushing them to commandsArray.
  await Promise.all(
    files.map(async (file) => {
      const command = await import(`file://${file}`);
      try {
        if (command.default.aliases) {
          command.default.aliases.forEach((alias) => {
            client.prefix_commands.set(alias, command);
          });
        }

        client.prefix_commands.set(command.default.name, command);
      } catch (err) {
        console.log(err);
        console.log(`An error occurred while loading prefix commands`.red);
      }
    })
  );
  console.log(`Successfully loaded all the prefix commands`.green);
}

export default loadPrefixCommands;
