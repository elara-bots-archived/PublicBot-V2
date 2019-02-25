const Discord = require('discord.js');
const {arrayClean} = require('../util/util.js');
module.exports.run = async (bot, oldMember, newMember) => {
    let modlogs = oldMember.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let guild = newMember.guild;
    if (oldMember.nickname !== newMember.nickname) {
        if(guild.me.hasPermission("VIEW_AUDIT_LOG")){
        guild.fetchAuditLogs({type: "MEMBER_UPDATE"}).then(async logs => {
        let mod = logs.entries.first().executor;
        let changed = logs.entries.first().target;
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`Nickname Changed`, newMember.user.displayAvatarURL)
                .setDescription(`**Old: **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}\n**New: **${newMember.nickname ? newMember.nickname : newMember.user.username}`)
                if(mod.id !== changed.id){embed.addField(`\u200b`, `**User: **${changed}\`\`${changed.tag}\`\` (${changed.id})\n**Updated By: **${mod} \`\`${mod.tag}\`\` (${mod.id})`)}
                if(mod.id === changed.id) {embed.addField(`\u200b`, `**User: **${changed}\`\`${changed.tag}\`\` (${changed.id})`)}
                embed.setTimestamp()
           return modlogs.send(e)
        })
        }else {
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(`Nickname Changed`, newMember.user.displayAvatarURL)
            .setDescription(`**Old: **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}\n**New: **${newMember.nickname ? newMember.nickname : newMember.user.username}`)
            .addField(`\u200b`, `**User: **${oldMember}\`\`${oldMember.user.tag}\`\` (${oldMember.id})`)
            .setTimestamp()
            modlogs.send(e)
    }
    } else
        if (oldMember.roles !== newMember.roles) {
            let guild = newMember.guild;
            let oldRoles = oldMember.roles.map(role => role.name)
            let newRoles = newMember.roles.map(role => role.name)
            if (oldRoles == newRoles) return
            let message = ''
            let r = ''
            oldRoles.forEach(role => {
                if (newRoles.includes(role)) {
                    return
                } else {
                    message = message + `Removed`
                    r = r + role
                }
            })

            newRoles.forEach(role => {
                if (oldRoles.includes(role)) {
                    return
                } else {
                    message = message + `Added`
                    r = r + role
                }
            })
            if (!message) return;
            if(!r) return;
            let e = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(`Role ${message}`, newMember.user.displayAvatarURL)
            if (!guild.me.hasPermission("VIEW_AUDIT_LOG")) {
                let embed = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setAuthor(`Unknown Member Role Change, For ${newMember.user.tag}`, newMember.user.displayAvatarURL)
                .addField(`Member`, `**User: **${newMember} \`${newMember.user.tag}\` (${newMember.id})`)
                .setTitle(`ERROR`)
                .setFooter(bot.user.tag, bot.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`I can't view audit logs!`)
                return modlogs.send(e)
            }else
            if(guild.me.hasPermission("VIEW_AUDIT_LOG")){
            if(oldMember.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(a => a.entries.first().target.id === newMember.id)){
            let who = await guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(audit => audit.entries.first().executor)
            let role = await newMember.guild.roles.find(c => c.name === r)
            e.addField(`Member`, `**User: **${newMember} \`${newMember.user.tag}\` (${newMember.id})`)
            e.addField(`${message} By`, `**Moderator: **${who} \`${who.tag}\` (${who.id})`)
            if(role){
            e.addField(`Role ${message}`, `**Role: **${role} \`${role.name}\` (${role.id})`)
            }else{
                e.addField(`Role ${message}`, `**Role: **${r}`)
            }
            e.setFooter(bot.user.tag, bot.user.displayAvatarURL)
            e.setColor(`PURPLE`)
            }
            return modlogs.send(e)
        }else{
            let e = new Discord.RichEmbed()
            .setColor(`PURPLE`)
            .addField(`Member`, `**User: **${newMember} \`${newMember.user.tag}\` (${newMember.id})`)
            .addField(`Moderator`, `**Unknown**`)
            .addField(`Role ${message}`, `**Role: **${role} \`${role.name}\` (${role.id})`)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL)
            return modlogs.send(e)
        }

    }
}
