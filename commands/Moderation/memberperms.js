const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "memberperm",
            memberName: "memberperm",
            aliases: [],
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_GUILD", "ADMINISTRATOR"],
            examples: ["N/A"],
            description: "N/A",
            args: [
                {
                    key: 'role',
                    prompt: `Please provide a role to give the member permissions to.`,
                    type: 'role'
                }
            ]
        })
    }
    async run(message, { role }) {
        message.delete(15000).catch()
        message.channel.overwritePermissions(role.id, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            MANAGE_MESSAGES: false,
            EMBED_LINKS: false,
            ATTACH_FILES: false,
            ADD_REACTIONS: true,
            MANAGE_CHANNELS: false,
            CREATE_INSTANT_INVITE: true,
            MENTION_EVERYONE: false,
            READ_MESSAGE_HISTORY: true,
            USE_EXTERNAL_EMOJIS: true,
            SEND_TTS_MESSAGES: false,
            MANAGE_WEBHOOKS: false,
            MANAGE_ROLES_OR_PERMISSIONS: false

        }, [`Reason\n${message.author.tag} Has Given Member Permissions to ${role.name} In ${message.channel.name}`]);
        const lockembed = new Discord.RichEmbed()
            .setColor(`#FF000`)
            .setDescription(`<@${message.author.id}> I have given ${role} Member Permissions in this channel.`)
            .setFooter(`This message will be deleted in 15 seconds..`)
        message.channel.send(lockembed).then(message => {
            message.delete(15000).catch()
        })
    }
}