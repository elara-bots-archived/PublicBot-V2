const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            memberName: "ban",
            aliases: [],
            examples: [`${client.commandPrefix}ban @user <reason here>`],
            description: "Bans the user.",
            group: "moderation",
            guildOnly: true,
            userPermissions: ["BAN_MEMBERS"],
            args: [
                {
                    key: "member", 
                    prompt: "what member do you want me to ban?",
                    type: "member"
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for this ban?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {member, reason }) {
        if(member.user.id === this.client.owners[0].id) return message.say(`I can't ban my bot owner..`)
        if(member.user.id === message.author.id) return message.say(`You can't ban yourself :face_palm: `)
        if(member.hasPermission("MANAGE_MESSAGES")) return message.say(`I can't ban another staff member.`)

        let banEmbed = new Discord.RichEmbed()
            .setTitle(`Action`)
            .setDescription("Member Banned")
            .setColor("#FF0000")
            .addField("Banned User", member.user.tag, true)
            .addField("Moderator", message.author, true)
            .addField("Reason", reason)
            .setFooter(`${member.id}`)
        let modlogs = message.guild.channels.find(c => c.name === "modlogs")
        if(!modlogs) modlogs = message.channel;
        await message.guild.ban(member.user.id);
        message.delete().catch();
        await modlogs.send(banEmbed)
    }
}