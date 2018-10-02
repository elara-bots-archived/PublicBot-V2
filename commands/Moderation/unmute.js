const { Command } = require('discord.js-commando'),
    ms = require('ms')
Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            memberName: "unmute",
            aliases: ["unsilence", "uncalm"],
            examples: ["e!unmute @user/userid"],
            description: "Unmutes a member",
            guildOnly: true,
            userPermissions: ["MANAGE_MESSAGES", "MANAGE_GUILD"],
            group: "moderation",
            args: [
                {
                    key: "member",
                    prompt: "What member do you want me to mute?",
                    type: "member"
                }
            ]
        })
    }
    async run(message, { member }) {
        const modlogs = message.guild.channels.find(c => c.name === "modlogs")
        let moderatorname = `<@${message.author.id}>`
        if (!modlogs) return message.channel.send("Can't find **modlogs**");
        let tomute = member
        if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry but i can't mute Mods/Admins!");
        let muterole = message.guild.roles.find(r => r.name === "Muted") || message.guild.roles.find(r => r.name === "muted")
       
        await (tomute.removeRole(muterole.id));
        let botembed = new Discord.RichEmbed()
            .setColor("#000FF")
            .setAuthor(`${tomute.user.username}`, `${tomute.user.avatarURL}`)
            .setDescription(`Unmute | ${tomute.user.tag} `)
            .addField("Moderator", moderatorname, true)
            .addField("User Unmuted", `<@${tomute.id}>`, true)
            .setTimestamp()
            .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL)
        modlogs.send(botembed)
        message.channel.send(`✅ ***${tomute.user.tag} Has Been Unmuted!***`);
        message.delete().catch();
        const dmembed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setDescription(`You have been Unmuted in **${message.guild.name}**`)
        tomute.send(`<@${tomute.id}>`)
        await tomute.send(dmembed)

    }
}