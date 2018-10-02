const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    {cats} = require('../../util/photos.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "cat",
            memberName: "cat",
            aliases: ["kitty", "kitten", "kittens"],
            examples: ["e!cat"],
            description: "Shows a adorable photo of a cat/kitten <:SmileyHearts:485361754633797654>",
            group: "imagecommands"
        })
    }
    async run(message) {
        let replies = cats
        let result = Math.floor((Math.random() * replies.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading the Command, Please Wait.,,,,")

        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
           embed.setDescription(`Here's a Photo of a Cat 😊 \n Link to Photo [Click Here](${replies[result]})`)
            embed.setImage(replies[result])
            embed.setFooter(`Cat Photo ${result}/${replies.length}`)
            message.edit(embed)
        })
    }
}