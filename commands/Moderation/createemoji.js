const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class EmojiCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "createemoji",
            memberName: "createemoji",
            description: "Creates a Emoji for the server",
            group: "moderation",
            examples: [`${client.commandPrefix}createemoji <Link Here> <Name Here>`],
            guildOnly: true,
            userPermissions: ["MANAGE_EMOJIS"],
            aliases: ['ce'],
            args: [
                {
                    key: 'ImageURL',
                    prompt: `Please provide a URL to a image to make into a emoji.`,
                    type: 'string'
                },
                {
                    key: "name",
                    prompt: "Please provide a name for the emoji.",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { ImageURL, name }) {
        let link = ImageURL,
            emojiname = name;
        message.guild.createEmoji(link, emojiname)
            .then(emoji => {
                let embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setDescription(`Created the Emoji!`)
                    .addField(`Emoji Name`, emoji.name, true)
                    .addField(`Emoji`, emoji, true)
                    .setImage(emoji.url)
                message.channel.send(embed)
            }).catch(error => {
                let embed = new Discord.RichEmbed()
                    .setColor(`#FF0000`)
                    .setTitle(`ERROR`)
                    .setDescription(`Image cannot be larger then 256KB`)
                message.say(embed)
            });
    }
}