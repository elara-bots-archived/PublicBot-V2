const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "8ball",
            memberName: "8ball",
            aliases: ["8b"],
            examples: ["e!8ball Is this true or false?"],
            description: "Ask a question",
            group: "fun",
            args: [
                {
                    key: 'content',
                    prompt: 'What question do you want to ask?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {content}) {
        let replies = ["Yes.", "No", "I don't know", "Ask Again Later", "Maybe"];
        let result = Math.floor((Math.random() * replies.length));
        let question = content
        let ballembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setColor("#000FF")
            .addField("Question", question)
            .addField("Answer", replies[result]);
        message.channel.send(ballembed);
    }
}