const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    superagent = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dog",
            memberName: "dog",
            aliases: ["doggo", "puppy"],
            examples: ["e!dog"],
            description: "Posts a random Dog Photo",
            group: "imagecommands"
        })
    }
    async run(message) {
        let { body } = await superagent
            .get(`https://random.dog/woof.json`);
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading the Command, Please Wait.,,,,")

        message.channel.send(embed).then(message => {
            embed.setColor("#000FF")
            embed.setDescription("Here's a Photo of a Dog 😊")
            embed.setImage(body.url)
            message.edit(embed)
        })
    }
}