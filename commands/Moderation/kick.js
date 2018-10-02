const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            memberName: "kick",
            aliases: [],
            examples: [`${client.commandPrefix}kick @user <reason here>`],
            description: "Kicks the user.",
            group: "moderation",
            guildOnly: true,
            userPermissions: ["KICK_MEMBERS"],
            args: [
                {
                    key: "member",
                    prompt: "what member do you want me to kick?",
                    type: "member"
                },
                {
                    key: 'content',
                    prompt: 'What is the reason for this kick?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { member, content }) {
        let bUser = member
        let bReason = content
        if (bUser.id === this.client.owners[0].id) return message.say(`I can't kick my bot owner :frowning:`)
        if (bUser.id === message.guild.ownerID) return message.say(`I can't kick the server owner silly.`)
        if(bUser.id === message.author.id) return message.say(`You can't kick yourself silly.`)
        if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That member is a Mod/Admin for the server!");

        let banEmbed = new Discord.RichEmbed()
            .setTitle(`Action`)
            .setDescription("Member Kicked")
            .setColor("#FF0000")
            .addField("Kicked User", `${bUser}`, true)
            .addField("Moderator", `<@${message.author.id}>`, true)
            .addField("Reason", bReason)
            .setFooter(`${bUser.id}`)
        let modlogs = message.guild.channels.find(c => c.name === "modlogs")
        if (!modlogs) modlogs = message.channel;
        message.guild.member(bUser).kick(bReason);
        message.delete().catch();
        await modlogs.send(banEmbed)
    }
}