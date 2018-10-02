const { Command } = require('discord.js-commando'),
    ms = require('ms')
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            memberName: "mute",
            aliases: ["silence", "calm"],
            examples: ["e!mute @user/userid <reason here>"],
            description: "Mutes a member",
            guildOnly: true,
            userPermissions: ["MANAGE_MESSAGES", "MANAGE_GUILD"],
            group: "moderation",
            args: [
                {
                    key: "member",
                    prompt: "What member do you want me to mute?",
                    type: "member"
                },
                {
                    key: "time",
                    prompt: "how much time do you want to mute the user for?",
                    type: "string"
                },
                {
                    key: 'content',
                    prompt: 'What is the reason for the mute?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {member,time, content}) {
        const modlogs = message.guild.channels.find(c => c.name === "modlogs")
        let moderatorname = `<@${message.author.id}>`
        if (!modlogs) return message.channel.send("Can't find **modlogs**");
        let tomute = member
        if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry but i can't mute Mods/Admins!");
        let muterole = message.guild.roles.find(r => r.name === "Muted") || message.guild.roles.find(r => r.name === "muted")
        let reason = content
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: `Muted`,
                    color: "#FF0000",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        READ_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        let mutetime = time;

        await (tomute.addRole(muterole.id));
        let botembed = new Discord.RichEmbed()
            .setColor("#000FF")
            .setAuthor(`${tomute.user.username}`, `${tomute.user.avatarURL}`)
            .setDescription(`Mute | ${tomute.user.tag} `)
            .addField("Moderator", moderatorname, true)
            .addField("User Muted", `<@${tomute.id}>`, true)
            .addField("Time", `${ms(ms(mutetime))}`, true)
            .addField(`Reason`, `${reason}`)
            .setTimestamp()
            .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL)
        modlogs.send(botembed)
        message.channel.send(`✅ ***${tomute.user.tag} Has Been Muted!***`);

        setTimeout(function () {
            let unmuteembed = new Discord.RichEmbed()
                .setColor(`#FF000`)
                .setDescription(`Unmute | ${tomute.user.tag}`)
                .addField(`Moderator`, `${moderatorname}`, true)
                .addField(`User Unmuted`, `<@${tomute.id}>`, true)
                .addField(`Reason`, `Auto`, true)
                .setTimestamp()
                .setFooter(`ID: ${tomute.id}`, `${tomute.user.avatarURL}`)
            tomute.removeRole(muterole.id);
            modlogs.send(unmuteembed);
        }, ms(mutetime));
        message.delete().catch();

        const dmembed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setDescription(`You have been Muted in **${message.guild.name}**`)
            .addField(`Time`, `${ms(ms(mutetime))}`)
            .addField(`Reason`, `${reason}`)
        tomute.send(`<@${tomute.id}>`)
        await tomute.send(dmembed)

    }
}