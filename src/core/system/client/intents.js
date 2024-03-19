import { GatewayIntentBits } from "discord.js";

//Loading necessary modules for client
const { Guilds, GuildMembers, MessageContent, DirectMessageReactions, DirectMessages, GuildMessages } = GatewayIntentBits;
const discordIntents = [Guilds, GuildMembers, MessageContent, DirectMessageReactions, DirectMessages, GuildMessages];

export default discordIntents;
