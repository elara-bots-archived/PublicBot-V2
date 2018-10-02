const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'fun',
            memberName: 'say',
            description: 'Sends a message to the channel',
            aliases: [],
            examples: ['say Hi there!'],
            guildOnly: true,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });
    }

    async  run(msg, { content }) {
        msg.delete().catch()
        msg.say(content);
    }
};