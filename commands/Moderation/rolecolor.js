const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rolecolor",
            memberName: "rolecolor",
            aliases: [],
            examples: ["e!rolecolor <role name/mention or id here> <new color here>"],
            description: "Changes the role color of the role you choose.",
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_ROLES", "MANAGE_GUILD", "ADMINISTRATOR"],
            args: [
                {
                    key: "role", 
                    prompt: "What role do you want to change the role color of?",
                    type: "role"
                },
                {
                    key: 'color',
                    prompt: 'What role do you want the role to be?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {role, color }) {
        let oldcolor = role.hexColor;
        await role.setColor(color).catch(error => message.channel.send(`Error: ${error}`));
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setTimestamp()
            .setTitle(`Action`)
            .setDescription(`Role Color Changed`)
            .addField(`Role`, role, true)
            .addField(`Role ID`, role.id, true)
            .addField(`Old Role Color`, oldcolor, true)
            .addField(`New Role Color`, color, true)
            .setFooter(`Changed By ${message.author.tag}`, message.author.displayAvatarURL)
        await message.channel.send(embed).catch(error => message.channel.send(`Error: ${error}`))
    }
}