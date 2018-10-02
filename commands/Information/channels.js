const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "channels",
            memberName: "channels",
            aliases: [],
            examples: [`${client.commandPrefix}channels`],
            description: "Gives you all of the channels in the server.",
            group: "information",
            guildOnly: true
        })
    }
    async run(message) {
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`**Text Channels**`)
            .setTimestamp()
            .setDescription(`${message.guild.channels.filter(c => c.type == "text").map(c => `<#${c.id}>`).join(", ")}`)
            .addField(`Voice Channels`, `${message.guild.channels.filter(c => c.type == "voice").map(c => `${c.name}`).join(", ")}`)
            .addField(`Categorys`, `${message.guild.channels.filter(c => c.type == "category").map(c => `${c.name}`).join(", ")}`)


        message.channel.send(embed)
    }
}