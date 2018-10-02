const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nick",
            memberName: "nick",
            aliases: ["nickname"],
            examples: ["e!nick @user <new nickname here>"],
            description: "Nickname the user",
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_NICKNAMES"],
            args: [
                {
                    key: "member",
                    prompt: "what member do you want me to change the nickname of?",
                    type: "member"
                },
                {
                    key: 'content',
                    prompt: 'What nickname do you want to set for that member?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { member, content }) {
    if(member.id === message.guild.owner.id) return message.say(`I Can't change the server owner's nickname!`)
     member.setNickname(content)
     let embed = new Discord.RichEmbed()
     .setColor(`RANDOM`)
     .setTitle(`Action`)
     .setDescription(`Nickname Changed\nUser: ${member}\nModerator: ${message.author}\nNew Nickname: **${content}**`)
     .setAuthor(member.user.tag, member.user.displayAvatarURL)
     .setFooter(`Changed By ${message.author.tag}`, message.author.displayAvatarURL)
     .setTimestamp()
     message.embed(embed)
    
    }
}