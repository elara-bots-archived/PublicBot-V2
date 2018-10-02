const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
module.exports = class UPCommand extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            memberName: "uptime",
            aliases: [],
            group: "information",
            examples: [`${client.commandPrefix}uptime`],
            description: "Tells you how long the bot has been online.",

        })
    }
    async run(message) {
        const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .addField(`Uptime`, duration)
        message.say(embed)
    }
}