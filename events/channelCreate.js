const Discord = require('discord.js');
module.exports.run = async (bot, channel) => {
    if (channel.type === "dm") return undefined;
    let modlogs = channel.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
   let e = new Discord.RichEmbed()
    if (channel.guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
        let logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" });
        let who = await logs.entries.first().executor
        e.setDescription(`
        **Name: **${channel} (${channel.name})
        **Type: **${channel.type}
        **ID: **${channel.id}
        **Created By: **${who}`)
        e.setColor("#FF000")
        e.setAuthor('Channel Created', channel.guild.iconURL)
        e.setFooter(`ID: ${channel.id}`)
        e.setTimestamp()
       return modlogs.send(e)
    } else {
        e.setDescription(`
        **Name: **${channel} (${channel.name})
        **Type: **${channel.type}
        **ID: **${channel.id}`)
        e.setColor("#FF000")
        e.setAuthor('Channel Created', channel.guild.iconURL)
        e.setFooter(`ID: ${channel.id}`)
        e.setTimestamp()
        return modlogs.send(e)
    }
}
