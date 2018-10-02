const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "members",
            memberName: "members",
            aliases: ["listmembers"],
            examples: [`${client.commandPrefix}members <role name/id>`],
            description: "Gives you all of the members in that role.",
            group: "information",
            guildOnly: true,
            args: [

                {
                    key: 'role',
                    prompt: 'Please Provide the role.',
                    type: 'role'
                }
            ]
        })
    }
    async run(message, { role }) {
       try { 
        let roleName = role
        let membersWithRole = message.guild.members.filter(member => {
            return member.roles.find(r => r === roleName);
        }).map(member => { return member.user; })
        if (membersWithRole.length === 0) return message.channel.send(`No one in that role, or that role doesn't exist`)
        let embed = new Discord.RichEmbed()
            .setDescription(`Users With the **${roleName}** Role\n\n${membersWithRole.join('\n')}`)
            .setColor(role.hexColor)
        message.channel.send(embed)
    } catch (e) {
        message.say(`To many people in that role..`)
    }
    }
}