const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "emojify",
            memberName: "emojify",
            aliases: [],
            examples: ["e!emojify <text here>"],
            description: "Emojifys the text you post",
            group: "fun",
            args: [
                {
                    key: 'content',
                    prompt: 'Please Provide the text you want me to emojify!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {content}) {
        const mapping = {
            ' ': '   ',
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '!': ':grey_exclamation:',
            '?': ':grey_question:',
            '#': ':hash:',
            '*': ':asterisk:'
        };

        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
        });


        message.channel.send(content.split('').map(c => mapping[c] || c).join(''));
    }
}