const Discord = require("discord.js");

module.exports = {
  name: "flip",
  description: "",
  execute(message, arg) {
    const face = Math.random() >= 0.5 ? "Its Heads!" : "Its Tails!";
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#9A1D22")
      .setTitle("Coin Flip")
      .setAuthor("StudBot")
      .setDescription(face);

    message.channel.send(helpEmbed);
  },
};
