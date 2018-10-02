const {Command} = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class RUSERCommand extends Command {
    constructor(client) {
        super(client, {
            name: "randomuser",
            aliases: ["ruser"],
            group: "information",
            examples: [`${client.commandPrefix}ruser\ne!ruser <role name here>`],
            description: "Gets a random user from everyone in the server or from a certain role",
            memberName: "randomuser",
            guildOnly: true
        })
    }
    async run (message) {
        let args = message.content.split(' ').slice(1)
        if (args.join(' ').length === 0) {
            var slot1 = Array.from(message.member.guild.members);
            var slot2 = Array.from(message.member.guild.members);
            var slot3 = Array.from(message.member.guild.members);
        } else
            if (args.join(' ')) {
                let roleName = args.join(' ')
                let membersWithRole = message.guild.members.filter(member => {
                    return member.roles.find(r => r.name === roleName);
                }).map(member => { return member.user; })
                if (membersWithRole.length === 0) return message.channel.send(`No one in that role, or that role doesn't exist`)
                var slot1 = membersWithRole;
                var slot2 = membersWithRole;
                var slot3 = membersWithRole;
            }
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("Randomizer", `${slot1[Math.floor(Math.random() * slot1.length)]} \n\n${slot2[Math.floor(Math.random() * slot2.length)]} <---  \n\n${slot3[Math.floor(Math.random() * slot3.length)]}`, true)
        let embed1 = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("Randomizer", `${slot1[Math.floor(Math.random() * slot1.length)]} \n\n${slot2[Math.floor(Math.random() * slot2.length)]} <---  \n\n${slot3[Math.floor(Math.random() * slot3.length)]}`, true)
        let embed2 = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("Randomizer", `${slot1[Math.floor(Math.random() * slot1.length)]} \n\n${slot2[Math.floor(Math.random() * slot2.length)]} <--- \n\n${slot3[Math.floor(Math.random() * slot3.length)]}`, true)
        let embed3 = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("Randomizer", `${slot1[Math.floor(Math.random() * slot1.length)]} \n\n${slot2[Math.floor(Math.random() * slot2.length)]} <---  \n\n${slot3[Math.floor(Math.random() * slot3.length)]}`, true)
        let embed4 = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("Randomizer", `${slot1[Math.floor(Math.random() * slot1.length)]} \n\n${slot2[Math.floor(Math.random() * slot2.length)]} <---  \n\n${slot3[Math.floor(Math.random() * slot3.length)]}`, true)
        var slots = [
            embed,
            embed1,
            embed2,
            embed3,
            embed4
        ]
        var randomSlot = slots[Math.floor(Math.random() * slots.length)];
        const slotmessage = await message.channel.send(randomSlot)
        var interval = setInterval(function () {
            var randomSlot = slots[Math.floor(Math.random() * slots.length)];
            slotmessage.edit(randomSlot)
                .catch(console.error); // add error handling here
        }, 1 * 1000);
        setTimeout(function (randomSlot) {
            clearInterval(interval);
            message.channel.send(`Winner! `)
        }, 10 * 1000)

    }
}