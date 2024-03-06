import ms from "ms";

export default {
  customId: "test",
  developer: true,
  cooldown: ms("10s"),

  async execute(interaction, client) {
    interaction.reply({ content: "it works :)" });
  },
};
