const Discord = require('discord.js');
module.exports.run = (bot, member) => {
    let modlogs = member.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setAuthor('❯\u2000\Member Left', member.user.displayAvatarURL)
        .setTimestamp()
        .addField(`❯\u2000\UserInfo`, `❯\u2000\Mention: **${member.user}**\n ❯\u2000\Tag: **${member.user.tag}** \n ❯\u2000\ID: **${member.id}**`)
        .addField(`❯\u2000\Had Role(s)`, member.roles.size > 1 ? arrayClean(null, member.roles.map((r) => {
            if (r.name !== '@everyone') {
                return r;
            }

            return null;
        })).join(' | ') : '**None**', false)
        .setFooter(`Member Left At`)
        .setThumbnail(member.user.displayAvatarURL)
    modlogs.send(botembed);
}