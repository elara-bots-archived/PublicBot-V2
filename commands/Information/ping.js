const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'information',
            memberName: 'ping',
            description: 'Shows the ping for the bot',
            examples: ['ping'],
            aliases: ["pong", "pung"],
            guildOnly: false
        });
    }

   async run(msg, client) {
        let loadingembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(`<a:Dots:426956230582599690> Loading......`)
            .setTimestamp()
        const message = await msg.channel.send(loadingembed);
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField(`Message Latency`, `${message.createdTimestamp - msg.createdTimestamp}ms`, true)
            .addField(`Bot Latency`, `${Math.round(this.client.ping)}ms`, true)
            .setAuthor(this.client.user.username, this.client.user.avatarURL)
        message.edit(embed);
    }
};