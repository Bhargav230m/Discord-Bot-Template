import { Partials } from "discord.js";

//Loading necessary modules for client
const { GuildMember, Message, ThreadMember, Channel } = Partials;
const discordPartials = [ GuildMember, Message, ThreadMember, Channel ];

export default discordPartials;