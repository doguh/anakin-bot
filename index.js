const Discord = require("discord.io");
const logger = require("winston");
const config = require("./config.js");

logger.level = "debug";

const bot = new Discord.Client({
  token: config.token,
  autorun: true
});

bot.on("ready", evt => {
  logger.info(`Bot logged in as: ${bot.username} (${bot.id})`);
});

bot.on("message", (user, userID, channelID, message, evt) => {
  if (userID === bot.id) {
    return;
  }
  iDontLikeSand(user, channelID, message);
  notJustTheMen(user, channelID, message);
});

function notJustTheMen(user, channelID, message) {
  const found = message.match(/[A-Za-zÀ-ÿ0-9_]*men[A-Za-zÀ-ÿ0-9_]*/i);
  if (found) {
    logger.debug(`Not just the men triggered by ${user}'s message: ${message}`);
    const men = found[0];
    const women = men.replace(/men/i, "women");
    const children = men.replace(/men/i, "children");
    bot.sendMessage({
      to: channelID,
      message: `Not just the ${men}, but the ${women} and ${children} too.`
    });
    return true;
  }
}

function iDontLikeSand(user, channelID, message) {
  const found = message.match(/[A-Za-zÀ-ÿ0-9_]*sand[A-Za-zÀ-ÿ0-9_]*/i);
  if (found) {
    logger.debug(`I dont like sand triggered by ${user}'s message: ${message}`);
    const sand = found[0];
    bot.sendMessage({
      to: channelID,
      message: `I don't like ${sand}. It's coarse and rough and irritating and it gets everywhere.`
    });
    return true;
  }
}
