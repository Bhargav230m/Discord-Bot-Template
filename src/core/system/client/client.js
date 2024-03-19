import { Client, Collection } from "discord.js"
import discordIntents from "./intents.js";
import discordPartials from "./partials.js";

//Constructing the client
const client = new Client({
    intents: discordIntents,
    partials: discordPartials,
    allowedMentions: {
        parse: ["everyone", "users", "roles"]
    },
    presence: {
        activities: [{
            name: 'BotName Helper',
            type: 4,
            state: '/ping | BotName'
        }]
    }
})

//creating collections
client.commands = new Collection();
client.components = new Collection();
client.prefix_commands = new Collection();
client.cooldown = new Collection();

export default client;
