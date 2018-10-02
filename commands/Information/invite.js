const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            memberName: "invite",
            aliases: ["botinvite"],
            examples: [`${client.commandPrefix}invite`],
            description: "Gives you a invite for the bot.",
            group: "information"
        })
    }
    async run(message) {
        this.client.generateInvite(["ADMINISTRATOR", "ADD_REACTIONS", "ATTACH_FILES", "CREATE_INSTANT_INVITE", "EMBED_LINKS", "EXTERNAL_EMOJIS", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "READ_MESSAGES", "PRIORITY_SPEAKER", "MANAGE_MESSAGES", "CHANGE_NICKNAME", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_EMOJIS", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MENTION_EVERYONE", "MOVE_MEMBERS", "MUTE_MEMBERS", "SPEAK", "USE_VAD", "VIEW_AUDIT_LOG", "VIEW_CHANNEL", "BAN_MEMBERS", "KICK_MEMBERS"])
            .then(link => {
                let embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                    .setTimestamp()
                    .addField(`Bot Invite`, `[Click Here](${link})`)
                message.say(embed)
            })
    }
}