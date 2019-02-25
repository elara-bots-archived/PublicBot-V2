const Discord = require('discord.js');
module.exports.run = async (bot, channel) => {
    let guild = channel.guild;
    let modlogs = guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let e = new Discord.RichEmbed()
    if (channel.guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
        let who = await channel.guild.fetchAuditLogs().then(audit => audit.entries.first().executor)
        e.setDescription(`
        **Name: **${channel} (${channel.name})
        **Type: **${channel.type}
        **ID: **${channel.id}
        **Deleted By: **${who}`)
        e.setColor("#FF0000")
        e.setAuthor('Channel Deleted', channel.guild.iconURL)
        e.setFooter(`ID: ${channel.id}`)
        e.setTimestamp()
       return modlogs.send(e)
    } else {
        e.setDescription(`
        **Name: **${channel} (${channel.name})
        **Type: **${channel.type}
        **ID: **${channel.id}`)
        e.setColor("#FF0000")
        e.setAuthor('Channel Deleted', channel.guild.iconURL)
        e.setFooter(`ID: ${channel.id}`)
        e.setTimestamp()
        return modlogs.send(e)
    }
}
