# Discord Bot Template

This Discord bot template is written in Discord.js using node.js. It provides various functionalities such as error handling, event handling, command handling, and component handling. The component handler supports handling buttons, all types of select menus, and modals. It also comes with mongodb support and utilizes ArrowmentJsonDB for small things 

## Features

- **Error Handling:** Comprehensive error handling to gracefully handle errors and prevent bot crashes.
- **Handlers:**
  - **Event Handler:** Handles Discord.js events for seamless integration of bot functionality.
  - **Command Handler:** Allows easy creation and management of commands with support for validators like `devOnly` and `cooldown`.
  - **Component Handler:** Supports handling buttons, select menus, and modals with built-in validators like `devOnly` and `cooldown`.
- **Validators:**
  - **devOnly:** Ensures that a command or component can only be used by developers or users with specific roles.
  - **cooldown:** Adds a cooldown period to prevent spamming of commands or components.

## Getting Started

To use this template for your Discord bot, follow these steps:

1. Clone or download the repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure the bot token and other settings in the `.env` file.
4. Customize the commands, events, and components according to your bot's requirements.
5. Run the bot using `npm .` or `node index.js`.

## Folder Structure

- **commands:** Contains command files organized by category.
- **events:** Contains event files for handling Discord.js events.
- **components:** Contains component files for handling buttons, select menus, and modals.
- **core:** Contains core/functions/utility files.
- **config.json:** Configuration file for defining bot settings.
- **index.js:** Main bot file for initializing and running the bot.

## Example Command

```javascript
// commands/test/example.js

import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import ms from "ms";

export default {
  developer: true,
  cooldown: ms("5s"),
  data: new SlashCommandBuilder()
    .setName("example")
    .setDescription("Example command!"),
  async execute(interaction, client) {
  },
};

```

## Example Component
```javascript
// components/buttons/test.js

import ms from "ms";

export default {
  customId: "test",
  developer: true,
  cooldown: ms("10s"),

  async execute(interaction, client) {
    interaction.reply({ content: "it works :)" });
  },
};

```

## Contributing

Contributions to this Discord bot template are welcome! If you have any suggestions, feature requests, or bug reports, feel free to open an issue or submit a pull request.

## License

This Discord bot template is licensed under the [GNU](LICENSE). Feel free to modify and use it for your own projects.
