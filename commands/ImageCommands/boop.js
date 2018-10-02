const { Command } = require('discord.js-commando'),
 {boops} = require('../../util/photos.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "boop",
            memberName: "boop",
            aliases: [],
            examples: ["e!boop"],
            description: "Posts a boop gif",
            group: "imagecommands",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to boop?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, { user }) {
        if(user.id === message.author.id) return message.say(`You can't boop yourself Silly :wink:`)
        let replies = boops
        let result = Math.floor((Math.random() * replies.length));
        let embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setImage(replies[result])
        .setAuthor(user.tag, user.displayAvatarURL)
        .setFooter(`Booped By: ${message.author.tag}`, message.author.displayAvatarURL)
        message.embed(embed)
    }
}