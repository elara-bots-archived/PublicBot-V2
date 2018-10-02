const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const snekfetch = require("snekfetch");
const humanizeduration = require("humanize-duration");
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "npm",
            memberName: "npm",
            aliases: [],
            examples: [`${client.commandPrefix}npm <Package Name here>`],
            description: "Gets info on the npm package you search.",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: 'What npm package do you want me to retrieve?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        snekfetch.get("https://skimdb.npmjs.com/registry/" + content.toLowerCase()).then((body) => {
            if (!body) return message.channel.send(`Nothing for ${content}`)
            let embed = new Discord.RichEmbed()
                .setThumbnail(`https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/npm/npm.png`)
                .setColor(`RANDOM`)
                .setTitle(`NPM Package **${body.body.name}**`)
                .setAuthor(`Author: ${body.body.author.name}`)
                .addField(`Name`, body.body.name, true)
                .addField(`Download`, `**[npm i ${body.body.name}](https://www.npmjs.com/package/${content.toLowerCase()})**`, true)
                .addField(`Description`, body.body.description, true)
                .addField(`Latest`, body.body["dist-tags"].latest, true)
                .addField(`Maintainers`, body.body.maintainers.map((m) => m.name).join(", "), true)
                .addField(`Last Updated`, humanizeduration(Date.now() - new Date(body.body.time[body.body["dist-tags"].latest]).getTime(), { round: true, largest: 2 }), true)
                .addField(`Github`, `[**Click Here**](${((body.body.repository) ? body.body.repository.url.replace("git+", "").replace(".git", "").replace("git://", "https://").replace("git@github.com:", "https://github.com/") : "No Repository")})`, true)
            message.channel.send(embed)
        }).catch(e => {
            const errorembed = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setTitle(`ERROR`)
                .setDescription(`${e}`)
            message.channel.send(errorembed)


        })
    }
}