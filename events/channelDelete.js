const Discord = require('discord.js');
module.exports.run = (bot, channel) => {
    let guild = channel.guild;
    let modlogs = guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setAuthor('Channel Deleted', channel.guild.iconURL)
        .setFooter(`ID: ${channel.id}`)
        .setTimestamp()
        .setDescription(`_ _►Name **${channel.name}**\n ►Type **${channel.type}**\n ►ID ${channel.id}\n ►Position ${channel.position}`)
    modlogs.send(botembed);
}