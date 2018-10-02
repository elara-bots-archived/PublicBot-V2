const { Command } = require('discord.js-commando'),
    arraySort = require('array-sort'),
    table = require('table'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "topinvites",
            memberName: "topinvites",
            aliases: ["invites", "ti", "topinvite"],
            examples: [`${client.commandPrefix}`],
            description: "Gives you the top invites for the server",
            group: "information",
            guildOnly: true
        })
    }
    async run(message) {
        let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send(`Sorry, I don't have the proper permissions to view invites!`);
        })
        invites = invites.array();
        arraySort(invites, 'uses', { reverse: true });
        let possibleInvites = [['User', 'Uses']];
        invites.forEach(function (invite) {
            possibleInvites.push([invite.inviter.username, invite.uses]);
        })
        const embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .addField('Leaderboard', `${table.table(possibleInvites)}`)
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)
        message.channel.send(embed)
    }
}