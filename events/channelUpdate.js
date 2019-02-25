const Discord = require('discord.js');
module.exports.run = async (bot, oldChannel, newChannel) => {
    let modlogs = oldChannel.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
   let embed = new Discord.RichEmbed()
        .setColor(`#FF000`)
        .setAuthor(newChannel.guild.name, newChannel.guild.iconURL)
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL)
    if (oldChannel.name !== newChannel.name) {
    if (oldChannel.guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
    let who = await oldChannel.guild.fetchAuditLogs().then(audit => audit.entries.first().executor)
    embed.setTitle(`Channel Name Changed`)
    embed.setDescription(`**Old: ** ${oldChannel.name}\n**New: ** ${newChannel.name}\n**ID: **${newChannel.id}\n**Updated By: ** ${who}`)
    return modlogs.send(embed)
   }else{
   embed.setTitle(`Channel Name Changed`)
   embed.setDescription(`**Old: ** ${oldChannel.name}\n**New: ** ${newChannel.name}\n**ID: **${newChannel.id}`)
   return modlogs.send(embed)
}
}
}
