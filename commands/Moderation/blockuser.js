const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blacklist",
            memberName: "blacklist",
            aliases: ["bl"],
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_GUILD", "MANAGE_MESSAGES", "ADMINISTRATOR"],
            examples: [`${client.commandPrefix}blacklist <username/mention/userid>`],
            description: "Removes the send messages permission for the user you give.",
            args: [
                {
                    key: 'member',
                    prompt: `Please provide a member to blacklist from this channel.`,
                    type: 'member'
                }
            ]
        })
    }
    async run(message, {member}) {
        message.delete(15000).catch()
        message.channel.overwritePermissions(member.id, {
            SEND_MESSAGES: false
        }, [`Reason\n${message.author.tag} Has blacklisted ${member.user.tag} From ${message.channel.name}`]);
        const lockembed = new Discord.RichEmbed()
            .setColor(`#FF000`)
            .setDescription(`<@${message.author.id}> Blocked that user from sending messages in this channel.`)
            .setFooter(`This message will be deleted in 15 seconds..`)
        message.channel.send(lockembed).then(message => {
            message.delete(15000).catch()
        })
    }
}