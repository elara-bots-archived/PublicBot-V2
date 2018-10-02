const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    superagent = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "poke",
            memberName: "poke",
            aliases: [],
            examples: ["e!poke @user/userid"],
            description: "Pokes the user you mention or their user id",
            group: "imagecommands",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to poke?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, {user}) {
        const { body } = await superagent
            .get(`https://nekos.life/api/v2/img/poke`);
        let hugUser = user;
        if(hugUser.id === message.author.id) return message.say(`You can't poke yourself silly :wink:`)
        let hugEmbed = new Discord.RichEmbed()
            .setDescription(`Poke \n\n**${message.author}** Poked **${hugUser}**!`)
            .setImage(body.url)
            .setColor("RANDOM")
        message.channel.send(hugEmbed)
    }
}