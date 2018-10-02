const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unblacklist",
            memberName: "unblacklist",
            aliases: ["unbl"],
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_GUILD", "MANAGE_MESSAGES", "ADMINISTRATOR"],
            examples: ["e!unblacklist <username/mention/userid>"],
            description: "Gives the send messages permission for the user you give.",
            args: [
                {
                    key: 'member',
                    prompt: `Please provide a member to unblacklist from this channel.`,
                    type: 'member'
                }
            ]
        })
    }
    async run(message, { member }) {
        message.delete(15000).catch()
        message.channel.overwritePermissions(member.id, {
            SEND_MESSAGES: true
        });
        const lockembed = new Discord.RichEmbed()
            .setColor(`#FF000`)
            .setDescription(`<@${message.author.id}> unblocked that user from sending messages in this channel.`)
            .setFooter(`This message will be deleted in 15 seconds..`)
        message.channel.send(lockembed).then(message => {
            message.delete(15000).catch()
        })
    }
}