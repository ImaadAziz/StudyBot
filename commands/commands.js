const Discord = require("discord.js");

module.exports = {
  name: "commands",
  description: "",
  execute(message, arg) {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#9A1D22")
      .setTitle("Commands:")
      .setAuthor("StudBot")
      .setDescription(
        "!help Gives a description on the bot and can be run on any command\n\n!assignments [week/month]\n\n!gpa [classess]\n\n!predict [weight] [assignments]\n\n!remindme (has multiple parameters)\n\n!poll (has multiple parameters)"
      );

    message.channel.send(helpEmbed);
  },
};
