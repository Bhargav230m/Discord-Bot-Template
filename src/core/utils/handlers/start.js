import figlet from "figlet";
import connectToDB from "../../database/mongodb/connect.js";
import client from "../client/client.js";
import loadEvents from "./loadEvents.js";
import registerSlashCommand from "./registerSlashCommand.js";
import "colors";
import loadComponents from "./loadComponents.js";
import loadPrefixCommands from "./loadPrefixCommands.js";

//Functions to start the code
async function start() {
  console.log("[SYSTEM]".red, `Sending request to log into the client!`.yellow);

  //Logins into the client and registers slash commands
  await client
    .login(process.env.token)
    .then(async () => {
      await registerSlashCommand(client);
      await loadEvents(client);
      await loadComponents(client);
      await loadPrefixCommands(client)
      await connectToDB();  
    })
    .catch((err) => console.error(err));

  //Doing some cool art yk
  console.log("");
  console.log(`${await figlet(client.user.tag)}`.magenta);
  console.log("[DISCORD]".blue, `Logged in as ${client.user.tag}!`.green);
  console.log("[CREATOR]".blue, "Made by Bhargav230m".cyan);
}

export default start;


/*


░█████╗░██████╗░██████╗░░█████╗░░██╗░░░░░░░██╗███╗░░░███╗███████╗███╗░░██╗████████╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗░██║░░██╗░░██║████╗░████║██╔════╝████╗░██║╚══██╔══╝
███████║██████╔╝██████╔╝██║░░██║░╚██╗████╗██╔╝██╔████╔██║█████╗░░██╔██╗██║░░░██║░░░
██╔══██║██╔══██╗██╔══██╗██║░░██║░░████╔═████║░██║╚██╔╝██║██╔══╝░░██║╚████║░░░██║░░░
██║░░██║██║░░██║██║░░██║╚█████╔╝░░╚██╔╝░╚██╔╝░██║░╚═╝░██║███████╗██║░╚███║░░░██║░░░
╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░
*/