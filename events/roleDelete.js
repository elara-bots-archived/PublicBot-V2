const Discord = require('discord.js');
module.exports.run = (bot, role) => {
    let guild = role.guild;
    let modlogs = guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#FF000")
        .setAuthor('Role Deleted', role.guild.iconURL)
        .setFooter(`${bot.user.tag}`, `${bot.user.displayAvatarURL}`)
        .setTimestamp()
        .setDescription(`_ _►Name **${role.name}** \n ►ID **${role.id}** \n ►Position **${role.position}** \n ►Hoisted **${role.hoist}** \n ►Mentionable **${role.mentionable}** \n ►Color **${role.hexColor}** \n ►Role Created At **${new Date(role.createdTimestamp)}**`)
    modlogs.send(botembed);
}