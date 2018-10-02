const Discord = require('discord.js');
module.exports.run = (bot, oldMessage, newMessage) => {
    if (oldMessage.channel.type === "dm") return;
    if (newMessage.channel.type === "dm") return;
    if (newMessage.author.bot) return;
    let modlogs = oldMessage.guild.channels.find(c => c.name === "modlogs") || message.guild.channels.find(c => c.name === "🤖modlogs")
    if (!modlogs) return;
    let content = oldMessage.content;
    if (content.length === 0) return;
    let content2 = newMessage.content;
    if (content.length === 0) return;
    if (content === content2) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTimestamp()
        .setAuthor(`Message Updated By ${newMessage.author.tag}`, `${newMessage.author.displayAvatarURL}`)
        .setFooter(`${bot.user.tag}`, `${bot.user.displayAvatarURL}`)
        .setDescription(`_ _►Content: \n ►Old Message **\`${content}\`** \n ►Update Message **\`${content2}\`** \n ►Channel ${newMessage.channel}`)
    modlogs.send(botembed);
}