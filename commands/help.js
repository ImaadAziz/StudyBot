const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "",
  execute(message, arg) {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#9A1D22")
      .setTitle("Commands:")
      .setAuthor("StudBot")
      .setDescription(
        "Hi! My names StudBot I'm here to help you with schoolwork and want you to succeed! Call !commands to see what I can do."
      );

    message.channel.send(helpEmbed);
  },
};
