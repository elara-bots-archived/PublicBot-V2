const { Command } = require('discord.js-commando'),
        Discord= require('discord.js');

module.exports = class AddRoleCommand extends Command {
   constructor(client) {
       super(client, {
           name: "addrole",
           group: "moderation",
           aliases: ["role+"],
           memberName: "addrole",
           description: "Adds a role to a user",
           examples: [`${client.commandPrefix}addrole @user <Role Name>`],
           userPermissions: ["MANAGE_ROLES", "MANAGE_GUILD", "ADMINISTRATOR"],
           guildOnly: true,
           args: [
               {
                   key: 'member',
                   prompt: 'What member do you want me to give the role to?',
                   type: 'member'
               },
               {
                   key: "role",
                   prompt: "What role do you want me to give to the member?",
                   type: "role"
               }
           ]
       })
   }

    async run(message, {member, role}) {
        let modlogs = message.guild.channels.find(c => c.name === "modlogs");
        if(!modlogs) modlogs = message.channel;
        if (member.roles.has(role.id)) return message.say("They already have that role.");
        await (member.addRole(role.id));
        let embed = new Discord.RichEmbed()
            .setColor('#AAEFE6')
            .setTitle(`Role Added`)
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .addField(`Role`, role, true)
            .addField(`Member`, member, true)
            .addField(`Moderator`, message.author, true)
            .setThumbnail(member.user.displayAvatarURL)
            .setTimestamp()
            modlogs.send(embed)
    }
};