const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
    const fetch = require('node-fetch');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "wiki",
            memberName: "wiki",
            aliases: ["wikipedia"],
            examples: ["e!wiki McDonalds"],
            description: "Gives you the wikipedia result for what you search for.",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want to search for?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        const article = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(content)}`)
            .then(response => response.json())
            .catch(() => { message.say(`Can't find anything with that name.`) });
        if(article.title === "Not found.") return message.say(`Nothing for that.`)
        const embed = new Discord.RichEmbed()
            .setColor(4886754)
            .setThumbnail((article.thumbnail && article.thumbnail.source) || 'https://i.imgur.com/fnhlGh5.png')
            .setURL(article.content_urls.desktop.page)
            .setTitle(article.title)
            .setDescription(`**${article.description}**\n\n${article.extract}`)
            .addField(`Article Written at`, article.timestamp, true)
            .addField(`Link`, `[Click Here](${article.content_urls.desktop.page})`, true)
            .setTimestamp()
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)
            .setAuthor(`Wikipedia`, `https://i.imgur.com/fnhlGh5.png`)

        message.embed(embed);
    }
}