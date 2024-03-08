import "colors";
import load from "./load.js";

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Collection<string, import("discord.js").Event>} event
 */
function listenForEvents(event, client) {
  //Loading the events
  const eventName = event.default.name;
  const execute = (...args) => event.default.execute(...args, client);
  //Rest if set
  if (event.default.rest) {
    if (event.default.once) client.rest.once(eventName, execute);
    else client.rest.on(eventName, execute);
  } else {
    //Execute once if set
    if (event.default.once) client.once(eventName, execute);
    else client.on(eventName, execute);
  }
}

/**
 * @param {import("discord.js").Client} client
 */
async function loadEvents(client) {
  console.log("Refreshing event(s)".yellow);
  await load("events", client.unknown, "src/events", listenForEvents, client);

  console.log(`Successfully loaded event(s)`.green);
}

export default loadEvents;
