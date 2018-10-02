const Discord = require('discord.js');
module.exports.run = (bot, role) => {
    let guild = role.guild;
    let modlogs = guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#FF000")
        .setAuthor('Role Created', role.guild.iconURL)
        .setFooter(`${bot.user.tag}`, `${bot.user.displayAvatarURL}`)
        .setTimestamp()
        .setDescription(`_ _►Name <@&${role.id}> (**${role.name}**)\n ►ID **${role.id}** \n ►Hex Color **${role.hexColor}** \n ►Hoisted ${role.hoist}`)
    modlogs.send(botembed);
}