const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');

module.exports = class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "roleinfo",
            group: "information",
            aliases: [],
            memberName: "roleinfo",
            description: "Gets info about a cetain role",
            examples: [`${client.commandPrefix}roleinfo <Role Name>`],
            guildOnly: true,
            args: [
                {
                    key: "role",
                    prompt: "What role do you want the info about?",
                    type: "role"
                }
            ]
        })
    }

    async run(message, { role }) {

        let hex = role.hexColor.toString().slice(1)
        let embed = new Discord.RichEmbed()
            .setThumbnail(`http://colorhexa.com/${hex}.png`)
            .addField("Role Name", role.name, true)
            .addField(`Role ID`, role.id, true)
            .addField(`Role Tag`, role, true)
            .addField(`Role Mention`, "``" + role + "``", true)
            .addField(`Role Hoisted`, role.hoist, true)
            .addField(`Role Mentionable`, role.mentionable, true)
            .addField(`Role Editable by Bot`, role.editable, true)
            .setColor(role.hexColor)
            .addField("Position", role.position, true)
            .addField("Hex Color", role.hexColor, true)
            .addField("Users", role.members.size, true)
            .addField(`Role Permissions`, `[Click Here](https://discordapi.com/permissions.html#${role.permissions})`, true)
            .setFooter(`Role Created`)
            .setTimestamp(role.createdAt)
        message.channel.send(embed)
    }
};