const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reddit",
            memberName: "reddit",
            aliases: ["rd"],
            examples: [`${client.commandPrefix}reddit Pug`],
            description: "Gives you a random reddit post from the thing you search for.",
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
    async run(msg, { content }) {
        if(content === "cats") content = "cat"
        const data = await fetch(`https://www.reddit.com/r/${content}/random.json`)
            .then(response => response.json())
            .then(body => {
                if (body.error) throw msg.say(`Error with that photo/post`);
                return body[0].data.children[0].data;
            })
            .catch(() => { throw console.error; });
            if(!data.url) return msg.say(`Nothing, please try again.`)

        if (data.over_18 && !msg.channel.nsfw) {
            msg.say('I cant post a NSFW image in this channel unless you mark it as NSFW!');
        }else{
            let embed = new Discord.RichEmbed()
            .setAuthor(`Photos from Reddit.`, `http://i.imgur.com/sdO8tAw.png`)
            .setColor(`RANDOM`)
            .setDescription(`Here is your **${content}**\nLink to photo [Click Here](${data.url})`)
            .setImage(data.url)
            .setFooter(`Requested By ${msg.author.tag}`, msg.author.displayAvatarURL)
        msg.embed(embed)
        }
    }
}