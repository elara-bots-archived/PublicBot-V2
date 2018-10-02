const Discord = require('discord.js');
const {arrayClean} = require('../util/util.js');
module.exports.run = (bot, oldMember, newMember) => {
    let modlogs = oldMember.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    if (oldMember.nickname !== newMember.nickname) {
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(newMember.user.tag, newMember.user.avatarURL)
            .setThumbnail(newMember.user.avatarURL)
            .setTitle(`Nickname Changed`)
            .addField(`Old Nickname`, `${oldMember.nickname ? `${oldMember.nickname}` : `${oldMember.user.username}`}`)
            .addField(`New Nickname`, `${newMember.nickname ? `${newMember.nickname}` : `${newMember.user.username}`}`)
            .setTimestamp()
        modlogs.send(embed)
    } else
        if (oldMember.roles !== newMember.roles) {
            let role1 = oldMember.roles.size > 1 ? arrayClean(null, oldMember.roles.map((r) => { if (r.name !== '@everyone') { return r; } return null; })).join(' | ') : 'None'
            let role2 = newMember.roles.size > 1 ? arrayClean(null, newMember.roles.map((r) => { if (r.name !== '@everyone') { return r; } return null; })).join(' | ') : 'None'
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(newMember.user.tag, newMember.user.avatarURL)
                .setThumbnail(newMember.user.avatarURL)
                .setTitle(`Role Changed`)
                .addField(`Old Roles`, `${role1}`)
                .addField(`New Roles`, `${role2}`)
                .setTimestamp()
            modlogs.send(embed)
        }
}