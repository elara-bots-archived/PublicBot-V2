const { Command } = require('discord.js-commando');

module.exports = class DmCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'fun',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            aliases: [""],
            examples: ['dm @User Hi there!'],
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user'
                },
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });
    }

  async  run(msg, { user, content }) {
        user.send(content);
       await msg.say(`${msg.author} Sent the message to ${user.tag}`)
    }
};