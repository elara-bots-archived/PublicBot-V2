const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "coin",
            memberName: "coin",
            aliases: ["coins", "flipcoin"],
            examples: ["e!coin"],
            description: "Flips a coin.",
            group: "fun"
        })
    }
    async run(message) {
        let replies = ['Heads', 'Tails']
        let result = Math.floor((Math.random() * replies.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("Flipping Coin")

        message.channel.send(embed).then(message => {
            embed.setColor("#000FF")
            embed.setDescription(`You Flipped \`${replies[result]}\``)
            message.edit(embed)
        })
    }
}