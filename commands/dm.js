module.exports = {
  name: "dm",
  description: "dm",
  execute(message, arg) {
    message.author.send(parseInt(arg[0]));
  },
};
