const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    superagent = require("superagent");
module.exports = class hugCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hug",
            memberName: "hug",
            aliases: ["hugs"],
            examples: ["e!hug @user"],
            description: "Hugs the user you mention/userid",
            group: "imagecommands",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to hug?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, {user}) {
        const { body } = await superagent
            .get(`https://nekos.life/api/v2/img/hug`);
        let hugEmbed = new Discord.RichEmbed()
            .setDescription(`Hug <a:hugs:485137939710345227>\n\n**${message.author}** hugged **${user}**!`)
            .setImage(body.url)
            .setColor("RANDOM")
        message.channel.send(hugEmbed)
    }
}