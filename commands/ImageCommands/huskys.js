const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    {Husky} = require('../../util/photos.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "husky",
            memberName: "husky",
            aliases: ["huskys"],
            examples: ["e!husky"],
            description: "Posts a husky photo",
            group: "imagecommands"
        })
    }
    async run(message) {
        let replies = Husky
        let result = Math.floor((Math.random() * replies.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading the Command, Please Wait.,,,,")

        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
            embed.setDescription("Here's a Photo of a Husky 😊")
            embed.setImage(replies[result])
            embed.setFooter(`Husky Photo ${result}/${replies.length}`)
            message.edit(embed)
        })
    }
}