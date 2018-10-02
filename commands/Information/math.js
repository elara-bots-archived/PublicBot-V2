const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    math = require('mathjs');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "math",
            memberName: "math",
            aliases: [],
            examples: [`${client.commandPrefix}math 1+1`],
            description: "Gives you the answer to the math question you ask.",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: 'What math calculation do you want the answer for?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        let resp;
        try {
            resp = math.eval(content);
        } catch (e) {
            return message.channel.send(`Sorry, Please Input a Valid Calculation!`)
        }
        const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Math Calculation`)
            .addField(`Input`, `\`\`\`\js\n${content}\`\`\``)
            .addField(`Output`, `\`\`\`js\n${resp}\`\`\``)
        message.channel.send(embed)
    }
}