var { Command } = require('discord.js-commando'),
    commandos = require('discord.js-commando');
const botversion = require('../../package.json');
const moment = require("moment");
require("moment-duration-format");
 const Discord = require('discord.js'),
 { version } = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stats",
            memberName: "stats",
            aliases: ["status"],
            examples: [`${client.commandPrefix}stats`],
            description: "Gives you the stats for the bot",
            group: "information"
        })
    }
    async run(message) {
        const bversion = botversion.version;
        const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let channelsize = this.client.channels.size;
        let guildsize = this.client.guilds.size;
        let usersize = this.client.users.size;
        const embed = new Discord.RichEmbed()
            .setColor(`#FF000`)
            .setThumbnail(this.client.user.avatarURL)
            .addField(`Memory Usage`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField(`Operating System`, process.platform, true)
            .addField(`Ping`, `${Math.round(this.client.ping)}ms`, true)
            .addField(`Bot Version`, bversion, true)
            .addField(`Uptime`, `${duration}`, true)
            .addField(`Users`, `${usersize}`, true)
            .addField(`Servers`, `${guildsize}`, true)
            .addField(`Channels`, `${channelsize}`, true)
            .addField(`Emojis`, this.client.emojis.size, true)
            .addField(`Voice Connections`, this.client.voiceConnections.size, true)
            .addField(`Discord.js Version`, `v${version}`, true)
            .addField(`Discord.js-Commando Version`, `v${commandos.version}`, true)
            .addField(`Node Version`, `${process.version}`, true)
        message.channel.send(embed);
    }
}