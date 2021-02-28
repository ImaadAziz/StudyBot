const Discord = require("discord.js");

module.exports = {
  name: "assignments",
  description: "assignments",
  execute(message, arg) {
    const word = arg[0];
    const weekAssignments = [
      "CS3345 Quiz 3",
      "CS2340 Exam 1",
      "CS3377 Assignment 75",
    ];
    const monthAssignments = [
      "CS3345 Quiz 3",
      "CS2340 Exam 1",
      "CS3377 Assignment 75",
      "MATH3325 Homework 7",
      "EPCS2200 Hazard Assessment",
      "CS2340 Exam 3",
    ];
    if (word === "week") {
      const resultEmbed = new Discord.MessageEmbed()
        .setColor("#9A1D22")
        .setTitle("Week Assignments")
        .setAuthor("StudBot")
        .setDescription(
          weekAssignments.map((assignment) => {
            return assignment + ", ";
          })
        );
      message.channel.send(resultEmbed);
    }
    if (word === "month") {
      const resultEmbed = new Discord.MessageEmbed()
        .setColor("#9A1D22")
        .setTitle("Month Assignments")
        .setAuthor("StudBot")
        .setDescription(
          monthAssignments.map((assignment) => {
            return assignment + ", ";
          })
        );
      message.channel.send(resultEmbed);
    }
  },
};
