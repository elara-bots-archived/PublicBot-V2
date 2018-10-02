const Discord = require('discord.js')
module.exports.run = (bot, info) => {
    console.error(`WARNING: \n${info}`);
    let warnembed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTitle(`WARNING`)
        .setDescription(info)
    bot.channels.get('490211594312220702').send(warnembed)
}