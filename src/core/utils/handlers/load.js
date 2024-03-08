import { Client } from "discord.js";
import loadFiles from "../../Functions/fileLoader.js";

/**
 * This function loads all the files in a specific directory and gives them to the function from the source
 * @param {String} name The name of the thing we are trying to load lmao
 * @param {any} collection The collection which will be cleared
 * @param {String} pathToFiles The path to the directory which will be loaded
 * @param {Function} specficFunction The function which will be executed when all the files are loaded
 * @param {Client} client The discord.js client
 * @returns {data} The data given by the specificFunction will be returned/passed
 */
async function load(name, collection, pathToFiles, specficFunction, client) {
  //Clear the collection
  await collection.clear();

  //Load the files
  const files = await loadFiles(pathToFiles);

  //Initialize a empty variable
  let data;

  //Promising all the files and looping through them
  await Promise.all(
    files.map(async (file) => {
      //Get the files data
      const filesData = await import(`file://${file}`);
      try {
        //Pass that to the specificFunction
        data = await specficFunction(filesData, client);
      } catch (err) {
        console.log(`An error occurred while loading ${name} -`, err);
      }
    })
  );

  return data;
}

export default load;
