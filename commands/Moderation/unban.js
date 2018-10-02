const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            memberName: "unban",
            aliases: [],
            examples: ["e!unban @user/userid"],
            description: "Unbans the member",
            group: "moderation",
            guildOnly: true,
            userPermissions: ["BAN_MEMBERS", "MANAGE_GUILD"],
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to unban?',
                    type: 'user'
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.fetchUser(user)
            .then(users => {
                message.guild.unban(users.id)
                    .then(() => {
                        let modlogs = message.guild.channels.find(c => c.name === "modlogs");
                        if(!modlogs) return message.channel;
                        let embed = new Discord.RichEmbed()
                        .setColor(`#FF000`)
                        .setTitle(`Member Unbanned`)
                        .setTimestamp()
                        .setFooter(`Unbanned At`)
                        .setAuthor(users.tag,users.displayAvatarURL)
                        .addField(`User`, users, true)
                        .addField(`Moderator`, message.author, true)
                        modlogs.send(embed)
                    }).catch(err => {
                        message.channel.send(`Failed to unban ${users.tag}`)
                    })
            }).catch(() => {
                message.channel.send("Sorry, I can't find a user with that ID...")
            })

    }
}