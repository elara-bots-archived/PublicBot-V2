const Discord = require('discord.js');
module.exports.run = (bot, guild) => {
    require('../util/playing.js')(bot)
    console.log(`I have been added to ${guild.name} with ${guild.memberCount} members!`)
    
//     let e = new Discord.RichEmbed()
//     .setAuthor(bot.user.tag, bot.user.displayAvatarURL)
//     .setColor(`#FF000`)
//     .setDescription(`I have been added to ${guild.name} with ${guild.memberCount} members!`);
//     return bot.channels.get("-- LOG CHANNEL ID --").send(e)
}
