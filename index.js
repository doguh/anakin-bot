const Discord = require("discord.io")
const logger = require("winston")
const config = require("./config.js")

logger.level = 'debug'

const bot = new Discord.Client({
    token: config.token,
    autorun: true
})

bot.on('ready', evt => {
    logger.info(`Bot logged in as: ${bot.username} (${bot.id})`)
})

bot.on('message', (user, userID, channelID, message, evt) => {
    if (userID === bot.id) {
        return
    }
    const found = message.match(/[A-Za-zÀ-ÿ0-9_]*men[A-Za-zÀ-ÿ0-9_]*/i)
    if (found) {
        logger.debug(`Triggered by ${user}'s message: ${message}`)
        const men = found[0]
        const women = men.replace(/men/i, "women")
        const children = men.replace(/men/i, "children")
        bot.sendMessage({
            to: channelID,
            message: `Not just the ${men}, but the ${women} and ${children} too`
        })
    }
})
