import load from "./load.js";
import "colors";

/**
 * Adds a component to the collection of components.
 * @param {import("discord.js").ComponentInteraction} component The component to add to the collection.
 * @param {import("discord.js").Client} client The Discord.js Client.
 */
function setComponentsToCollection(component, client) {
  client.components.set(component.default.customId, component);
}

/**
 * Reloads all the components of the client.
 * @param {Client} client The Discord.js Client.
 */
async function loadComponents(client) {
  console.log("Refreshing component(s)".yellow);
  await load(
    "components",
    client.components,
    "src/components",
    setComponentsToCollection,
    client
  );

  console.log("Successfully reloaded all the component(s)".green);
}

export default loadComponents;
