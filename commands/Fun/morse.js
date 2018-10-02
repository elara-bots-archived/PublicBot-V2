const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const morse = require('morse-node').create('ITU');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "morse",
            memberName: "morse",
            aliases: [],
            examples: ["e!morse <text here>"],
            description: "Turns the text you give into morse code",
            group: "fun",
            args: [
                {
                    key: 'content',
                    prompt: 'Please Provide the text you want me to turn into morse code?!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {content}) {
        const translated = morse.encode(content);
        const embed = new Discord.RichEmbed()
            .setColor('0x0000FF')
            .setTitle('Morse Code Translator')
            .addField('📥 Original 📥', content, false)
            .addField('📤 Morse Code 📤', translated, false)
            .setTimestamp();
        message.channel.send(embed);
    }
}