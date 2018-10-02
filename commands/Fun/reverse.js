const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reverse",
            memberName: "reverse",
            aliases: [],
            examples: ["e!reverse <text here>"],
            description: "Reverses the text you give the bot.",
            group: "fun",
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want me to reverse?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {content}) {
        function reverseString(str) {
            return str.split("").reverse().join("");
        }
        let sreverse = reverseString(content)
        const reverseEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL)
            .setColor(0xFFF000)
            .addField('Input: ', '```' + `${content}` + '```')
            .addField('Output: ', '```' + `${sreverse}` + '```')
        message.channel.send({ embed: reverseEmbed })
    }
}