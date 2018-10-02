const {Command} = require('discord.js-commando'),
Discord = require('discord.js'),
config = require('../../config.js')
module.exports = class SACommand extends Command {
    constructor(client) {
        super(client, {
            name: "setavatar",
            memberName: "setavatar",
            group: "botowner",
            description: "Sets the avatar of the Bots Account",
            aliases: ["sa", "setav"],
            ownerOnly: true
        })
    }
    async run (message) {
        let logchannel = this.client.channels.get(process.env.LOG_CHANNEL || config.logchannel)
        let image = message.attachments.first().url;
        this.client.user.setAvatar(image);
        message.react(`476629550797684736`)
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(`Profile Photo Changed!\n\n **Old Profile Photo --->**\n\n**New Profile Photo**`)
            .setImage(image)
            .setThumbnail(this.client.user.avatarURL)
        logchannel.send(embed)
    }
}