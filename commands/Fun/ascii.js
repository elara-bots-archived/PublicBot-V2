const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    figlet = require('figlet');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ascii",
            memberName: "ascii",
            aliases: ["ac"],
            examples: ["e!8ball <text here>"],
            description: "",
            group: "fun",
            args: [
                {
                    key: 'content',
                    prompt: 'Please provide the text to make into ascii text!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        figlet(content, (err, data) => {
            message.channel.send(data, {
                code: 'ascii'
            })

        })
    }
}