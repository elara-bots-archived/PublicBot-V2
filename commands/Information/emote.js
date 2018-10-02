const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "emote",
            memberName: "emote",
            aliases: ["emojifind", "emojisearch"],
            examples: [`${client.commandPrefix}emote <emoji name here>`],
            description: "This will post information about the emoji you search for.",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: 'What emoji do you want me to get the info about?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        let search = content;
        let emoji = this.client.emojis.find(e => e.name === search) || this.client.emojis.find(e => e.id === search)
        if(!emoji) return message.say(`Nothing for that.`)
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(`Emoji Info`)
            .addField(`Emoji Name`, emoji.name, true)
            .addField(`Emoji ID`, emoji.id, true)
            .addField(`Emoji URL`, `[Click Here](${emoji.url})`, true)
            .addField(`Animated`, `${emoji.animated}`, true)
            .addField(`Managed by a service`, emoji.managed, true)
            .addField(`Emoji Server`, emoji.guild.name, true)
            .setThumbnail(emoji.url)
        message.channel.send(embed)
    }
}