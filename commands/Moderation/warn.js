const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "warn",
            memberName: "warn",
            aliases: [],
            examples: ["e!warn @user/userid <reason here>"],
            guildOnly: true,
            userPermissions: ["MANAGE_MESSAGES", "MANAGE_GUILD"],
            description: "Warns a member",
            group: "moderation",
            args: [
                {
                    key: "member",
                    prompt: "What member do you want me to warn?",
                    type: "member"
                },
                {
                    key: 'warning',
                    prompt: 'What is the reason for the warning?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { member, warning }) {
        let Moderatoruser = message.author.id;
        let reason = warning;
        let rUser = member
        let modlogs = message.guild.channels.find(c => c.name === "modlogs");
        if (!modlogs) return message.channel.send('Cant Find the modlogs Channel');
        if (rUser.id === message.author.id) return message.channel.send(`Can't warn yourself Silly.`)
        message.channel.send(`** ✅ ${rUser} Has been warned.**`)
        const dmembed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setDescription(`You have been warned in **${message.guild.name}** For **${reason}**`)
        rUser.send(dmembed)
        const warnembed = new Discord.RichEmbed()
            .setColor(`#ff0000`)
            .addField(`Warned User`, `<@${rUser.id}>`, true)
            .addField(`Moderator`, `<@${Moderatoruser}>`, true)
            .addField(`Reason`, `${reason}`)
            .setTimestamp()
            .setFooter(`ID: ` + `${rUser.id}`, rUser.avatarURL)
        modlogs.send(warnembed);
        await message.delete().catch();
    }
}