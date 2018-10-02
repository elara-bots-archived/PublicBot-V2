const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "membercount",
            memberName: "membercount",
            aliases: ["mc"],
            examples: ["e!mc"],
            description: "Gives you the membercount for your server.",
            group: "information",
            guildOnly: true
        })
    }
    async run(message) {
        const embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : "https://cdn.discordapp.com/emojis/483118381650804747.gif")
            .setColor(`RANDOM`)
            .setTimestamp()
            .addField(`Members`, `**${message.guild.memberCount}**`, true)
            .addField(`Humans`, `**${message.guild.members.filter(member => !member.user.bot).size}**`, true)
            .addField(`Bots`, `**${message.guild.members.filter(member => member.user.bot).size}**`, true)
            .addField(`Member Statuses`, `**${message.guild.members.filter(o => o.presence.status === 'online').size}** Online\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Idle/Away\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Offline/Invisible`, true)
        message.channel.send(embed)
    }
}