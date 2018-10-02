const { Command } = require('discord.js-commando'),
    randomPuppy = require('random-puppy'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "meme",
            memberName: "meme",
            aliases: [],
            examples: [`${client.commandPrefix}meme`],
            guildOnly: true,
            description: "Gives you a meme",
            group: "imagecommands",
            nsfw: true,
        })
    }
    async run(message) {
      const subreddits = [
            "meme"
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                if(!url) return message.say(`Didn't find one try again.`)
                let user = message.author;
                let userurl = message.author.displayAvatarURL;
                const embed = new Discord.RichEmbed()
                    .setColor(`#FF000`)
                    .setDescription(`<a:Dots:426956230582599690> Loading......`)
                message.channel.send(embed).then(message => {
                    embed.setColor(`#000FF`)
                    embed.setDescription(`Here is your meme!\n[Click Here](${url})`)
                    embed.setImage(url)
                    embed.setFooter(`Requested By ${user.tag}`, userurl)
                    message.edit(embed);
                })
            })
    
    }
}