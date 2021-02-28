module.exports = {
  name: "gpa",
  description:
    "!gpa [numClasses]: Asks you your letter grade for the number of classes and calculates GPA.",
  execute(message, arg) {
    if (arg[0] == "help") {
      const helpEmbed = new Discord.MessageEmbed()
        .setAuthor("GPA Help List")
        .addField("Calculate a students semester GPA")
        .addField(
          "Call !gpa [numClasses] with numClasses being the number of classes you are taking this semester"
        )
        .addField(
          "Create a Timed Poll",
          `\`time=X(s|m|h|d)\` (X is the amount of time followed with the unit of time)`
        )
        .addField(
          "End a Poll and View Results",
          `\`end ID\` (ID is displayed on the poll)`
        )
        .addField("See examples", `\` examples\``)
        //.addBlankField()
        .setColor("#DDA0DD");

      message.channel.send(helpEmbed);
    } else {
      const filter = (m) => m.author.id === message.author.id;
      const classes = arg[0] == null ? 5 : args[0];
      const credits = [3, 3, 1, 4, 2]; // would orginally get from blackboard
      const grades = [];
      let counter = 0;
      message.channel.send("What are your letter grades for these classes? ");
      message.channel
        .awaitMessages(filter, {
          max: classes,
          time: 1000 * 30,
          errors: ["time"],
        })
        .then((collected) => {
          collected.map((msg) => {
            if (msg.content === "A" || msg.content === "a") {
              grades[counter] = 4.0;
            } else if (msg.content === "B" || msg.content === "b") {
              grades[counter] = 3.0;
            } else if (msg.content === "C" || msg.content === "c") {
              grades[counter] = 2.0;
            } else if (msg.content === "D" || msg.content === "d") {
              grades[counter] = 1.0;
            } else if (msg.content === "F" || msg.content === "f") {
              grades[counter] = 0.0;
            }
            counter++;
          });
          let result = 0;
          let i = 0;
          grades.forEach((grade) => {
            result += grade * credits[i];
            i++;
          });
          console.log(result);
          const creditSum = credits.reduce((a, b) => a + b, 0);
          console.log(creditSum);
          //gpa = result / creditSum;
          message.channel.send(
            `Your calculated GPA is ${(result / creditSum).toFixed(2)}`
          );
        })
        .catch((err) => console.log(err));
    }
  },
};
