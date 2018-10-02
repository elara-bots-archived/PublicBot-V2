const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    superagent = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "check",
            memberName: "check",
            aliases: ["linkcheck"],
            examples: [`${client.commandPrefix}check <Link here>`],
            description: "Checks if the site is safe or not.",
            group: "information",
            args: [{
                key: "content",
                prompt: "What link do you want me to check out?",
                type: "string"
            }]
        })
    }
    async run(message, {content}) {
        let { body } = await superagent
            .get(`https://spoopy.link/api/${content}`)
            let safe = body.chain.map(c => c.safe);
            let reason = body.chain.map(c => c.reasons);
                let embed = new Discord.RichEmbed()
                    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                    .setTimestamp()
                    .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)
                    .addField(`Link Checked`, body.chain.map(c => c.url))
                    .addField(`Safe?`, safe)
                try{if(reason.length === 1) {
                    embed.addField(`Reason`, reason) 
                    embed.setColor(`#FF0000`)
                }} catch(e) {
                    embed.addField(`Reason`, `Link is safe`)
                    embed.setColor(`#FF000`)
                }
                message.say(embed);

    }
}