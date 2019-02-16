const Discord = require('discord.js');
module.exports.run = (bot, guild) => {
    require('../util/playing.js')(bot)
 console.log(`I have been removed from ${guild.name} with ${guild.memberCount} members!`)
}
