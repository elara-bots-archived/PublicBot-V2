const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "prune",
            memberName: "prune",
            aliases: ["purge"],
            examples: ["e!prune <amount here>"],
            description: "Prunes/Purges the channel",
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: 'amount',
                    prompt: 'How many messages should I purge?',
                    min: 1,
                    max: 100,
                    type: 'integer'
                }
            ],
        })
    }
    async run(msg, { amount }) {
        amount = amount === 100 ? 99 : amount;
        msg.channel.bulkDelete(amount + 1, true);

        const reply = await msg.say(`\`Deleted ${amount + 1} messages\``);

        return reply.delete({
            timeout: 1000,
            reason: 'Deleting own return message after purge'
        });
    }
}