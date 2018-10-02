const Discord = require('discord.js');
module.exports.run = (client, member) => {
    let modlogs = member.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#1CFF00")
        .setAuthor('Member Joined', member.user.displayAvatarURL)
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        .setDescription(`${member} ${member.user.tag}`)
        .setThumbnail(member.user.displayAvatarURL)
    modlogs.send(botembed);
}