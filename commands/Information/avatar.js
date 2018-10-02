const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client,
            {
                name: "avatar",
                memberName: "avatar",
                group: "information",
                description: "Shows user's avatar.",
                examples: [`${client.commandPrefix}avatar`],
                args: [
                    {
                        key: "user",
                        prompt: "What user do you want the profile photo from?",
                        type: "user"
                    }
                ]
            });
    }
    async run(message, {user}) {
        if(user.displayAvatarURL.includes(".png" || ".jpg")){
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(user.tag, user.displayAvatarURL)
                .setDescription(`[Avatar URL](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=2048)`)
                .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=2048`)
                .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
            message.say(embed)
        } else 
            if (user.displayAvatarURL.includes(".gif")) {
                let embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setDescription(`[Avatar URL](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=2048)`)
                    .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=2048`)
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
                message.say(embed)
            } else {
                return;
            }
    }
}