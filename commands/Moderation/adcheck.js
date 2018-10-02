const {Command} = require('discord.js-commando'),
Discord = require('discord.js');
module.exports = class AdCheckCommand extends Command {
    constructor(client){
        super(client, {
            name: "adcheck",
            group: "moderation",
            aliases: [],
            memberName: "adcheck",
            guildOnly: true,
            examples: [`${client.commandPrefix}adcheck`],
            description: "Checks for discord invites in users playing statuses",
            userPermissions: ["MANAGE_MESSAGES", "MANAGE_GUILD", "ADMINISTRATOR"]
        })
    }
    async run (message) {
        const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
        const adchecker = members.map(member => `${member} (${member.id})`).join("\n") || "No invite links found."
        const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Discord invites in these users playing statuses`)
            .setDescription(adchecker)
        message.say(embed)
    }
}