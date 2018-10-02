const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
   {Pug} = require('../../util/photos.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pug",
            memberName: "pug",
            aliases: ["puggle", "puggie"],
            examples: ["e!pug"],
            description: "Posts a Pug Photo :D",
            group: "imagecommands"
        })
    }
    async run(message) {
        let replies = Pug
        let result = Math.floor((Math.random() * replies.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading a Pug Photo, Please Wait....")

        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
            embed.setDescription(`Here's a Photo of a Pug 😊 \n Link to Photo [Click Here](${replies[result]})`)
            embed.setImage(replies[result])
            embed.setFooter(`Pug Photo ${result}/${replies.length}`)
            message.edit(embed)
        })
    }
}