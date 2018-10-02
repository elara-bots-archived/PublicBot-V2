const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "poll",
            memberName: "poll",
            aliases: [],
            examples: ["e!poll <#channel> <poll question here>"],
            description: "Posts a poll in the selected channel!",
            group: "moderation",
            userPermissions: ["MANAGE_MESSAGES"],
            guildOnly: true,
            args: [
                {
                    key: "channel",
                    prompt: "What Channel do you want it to be posted in?",
                    type: "channel"

                },
                {
                    key: 'poll',
                    prompt: 'What do you want the poll to be?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { channel, poll }) {
        message.delete().catch()
        const embed = new Discord.RichEmbed()
            .setColor(`#000FF`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(poll)
            .setTitle(`Poll Created By ${message.author.username}`)
            .setFooter(`React to Vote!`)
        message.say('Message sent..').then(message => {
            channel.send(embed).then(message => {
                message.react('👎')
                message.react('👍')
            })
        })
    }
}