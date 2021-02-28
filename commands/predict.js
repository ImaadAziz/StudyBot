const Discord = require("discord.js");

module.exports = {
  name: "predict",
  description: "predict",
  execute(message, arg) {
    if (arg[0] == "help") {
      const helpEmbed = new Discord.MessageEmbed()
        .setColor("#9A1D22")
        .setTitle("Grade-predict Help Guide")
        .setAuthor("StudBot")
        .setDescription(
          "This command calculates the amount of points you would get given a weight and an amount of assignments\n\nCall !grade-predict [weight] [assignments] where weight is the weight of the assignments and assignments is the number of assignments.\n\n After call, the bot will then ask for you grades on these assignments and return your points\nExamples:  !grade-predict 60 3, !grade-predict 20 5"
        );
      message.channel.send(helpEmbed);
    } else {
      const weight = arg[0];
      const assignments = arg[1];
      const grades = [];
      let counter = 0;
      const filter = (m) => m.author.id === message.author.id;
      message.channel.send("What were your grades on these assignments?");
      message.channel
        .awaitMessages(filter, {
          max: assignments,
          time: 1000 * 30,
          errors: ["time"],
        })
        .then((collected) => {
          collected.map((msg) => {
            grades[counter] = parseInt(msg);
            counter++;
          });

          const gradeSum = grades.reduce((a, b) => a + b, 0);
          const percentage = gradeSum / assignments;
          const points = (percentage / 100) * weight;
          const resultEmbed = new Discord.MessageEmbed()
            .setColor("#9A1D22")
            .setTitle("Grade Prediction")
            .setAuthor("StudBot")
            .setDescription(
              `You will be getting ${points.toFixed(2)}% out of ${weight}%`
            );
          message.channel.send(resultEmbed);
        })
        .catch((err) => console.log(err));
    }
  },
};
