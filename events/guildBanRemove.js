const Discord = require('discord.js');
module.exports.run = (bot, guild, user) => {
    let modlogs = guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#12FF00")
        .setAuthor('Member Unbanned', user.displayAvatarURL)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()
        .setDescription(`${user} ${user.tag}`)
        .setThumbnail(user.displayAvatarURL)
    modlogs.send(botembed);
}