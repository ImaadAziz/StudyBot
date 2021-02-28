const Discord = require("discord.js");
module.exports = {
  name: "remindme",
  description: "Reminds User about due dates for assignments",
  execute(msg, arg) {
    if (arg[0] == "help") {
      const helpEmbed = new Discord.MessageEmbed()
        .setColor("#9A1D22")
        .setTitle("Remindme Help Guide")
        .setAuthor("StudBot")
        .setDescription(
          "How to Use this Command: \n" +
            "Command Syntax: !remindme assignmentName dueDate specific@ \n" +
            "Example Command: !remindme csHomework3 March 4 2021 user \n" +
            "Example Assignment Name: csHomework2 \n" +
            "Example Due Date: July 4 1776 \n" +
            "specific@: user or everyone \n" +
            "If you need to check a due date for an assingment use !remindme check assignmentName \n" +
            "If you need to list out all the assignments and their due dates use !remindme list\n\nExample commands:\n!remindme help\n!remindme check\n!remindme list \n!remindme to create a reminder "
        );

      msg.channel.send(helpEmbed);
    } else if (msg.content.startsWith("!remindme", 0)) {
      var splitInput = msg.content.split(" ", 6);
      var assignmentName = splitInput.slice(1, 2);
      if (assignmentName.length === 0) {
        msg.channel.send(
          "Invalid Command, Please run the command '!remindme help'"
        );
      } else {
        var dueMonth = splitInput.slice(2, 3);
        var dueDay = splitInput.slice(3, 4);
        var dueYear = splitInput.slice(4, 5);
        var specificAt = splitInput.slice(5, 6);
        if (specificAt.toString() === "user") {
          var atString = ` ${msg.author} Reminder set for `;
        } else if (specificAt.toString() === "everyone") {
          atString = "@everyone Reminder set for ";
        } else if (
          !assignmentName.includes("check") &&
          !assignmentName.includes("list")
        ) {
          var timeStart = Date.now();
          var timeEnd = new Date(
            (dueMonth + " " + dueDay + " " + dueYear + " 23:59").toString()
          );
          var timeDif = timeEnd - timeStart;
          addToArray(assignmentName.toString(), timeEnd.toDateString());
          function addToArray(name1, time1) {
            remindDates.push({ name: name1, due: time1 });
            return remindDates;
          }
          const resultEmbed = new Discord.MessageEmbed()
            .setColor("#9A1D22")
            .setTitle("Reminder!")
            .setAuthor("StudBot")
            .setDescription(
              atString +
                assignmentName +
                " on " +
                dueMonth +
                " " +
                dueDay +
                " " +
                dueYear
            );
          msg.channel.send(resultEmbed);
          var hasRun = true;
          var intervalID = setInterval(() => {
            if (hasRun) {
              const resultEmbed = new Discord.MessageEmbed()
                .setColor("#9A1D22")
                .setTitle("Reminder!")
                .setAuthor("StudBot")
                .setDescription(
                  atString + " " + assignmentName + " is due Tonight!"
                );
              msg.channel.send(resultEmbed);
              clearInterval(intervalID);
            }
          }, timeDif - 43200000); //Math.abs(seconds)
        } else if (assignmentName.includes("check")) {
          var returnedDate = remindDates.filter(filterArray);
          function filterArray(word) {
            if (word.name === dueMonth.toString()) {
              return word;
            }
          }
          const resultEmbed = new Discord.MessageEmbed()
            .setColor("#9A1D22")
            .setTitle("Reminder!")
            .setAuthor("StudBot")
            .setDescription(
              returnedDate[0].name + " is due " + returnedDate[0].due
            );
          msg.channel.send(resultEmbed);
        } else if (assignmentName.includes("list")) {
          remindDates.map((element) => {
            const resultEmbed = new Discord.MessageEmbed()
              .setColor("#9A1D22")
              .setTitle("Reminder!")
              .setAuthor("StudBot")
              .setDescription(element.name + " " + element.due);
            msg.channel.send(resultEmbed);
          });
        }
      }
    }
  },
};
