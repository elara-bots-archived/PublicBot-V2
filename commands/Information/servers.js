const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "servers",
            memberName: "servers",
            aliases: [],
            examples: [`${client.commandPrefix}servers`],
            description: "Gives you the names of the servers the bot is currently in.",
            group: "information"
        })
    }
    async run(message) {
        let string = '';
        this.client.guilds.forEach(guild => { string += `${guild.name}` + '\n'; })
        const hastEmb = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(string)
            .setTitle(`Current Number of Servers **[${this.client.guilds.size}]**\nHere is a List of all of the Servers: `)
        message.embed(hastEmb)
    }
}