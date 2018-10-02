const {Command} = require('discord.js-commando'),
Discord = require('discord.js'),
config = require('../../config.js');
module.exports = class SNCommand extends Command {
    constructor(client){
        super(client, {
            name: "setname",
            memberName: "setname",
            group: "botowner",
            ownerOnly: true,
            examples: [`${client.commandPrefix}setname <Name Here>`],
            aliases: ['sn', 'setn'],
            description: "Sets the Name for the Bot Account"
        })
    }
    async run(message) {
        try {
            let args = message.content.split(' ').slice(1)
            let oldbotname = this.client.user.username;
            let logchannel = this.client.channels.get(process.env.LOG_CHANNEL) || this.client.channels.get(config.logchannel)
            let newbotname = args.join(" ");
            this.client.user.setUsername(newbotname);
            await message.react(`476629550797684736`)
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setDescription(`Username Changed!`)
                .addField(`Old Username`, oldbotname, true)
                .addField(`New Username`, newbotname, true)
            logchannel.send(embed)
        } catch (e) {
            message.channel.send(`ERROR:\n${e}`)
        }
    }
}