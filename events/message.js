const Discord = require('discord.js');
module.exports.run = async (bot, message) => {
    if (message.channel.id === "473574603374067732") {
        let riddlerrole = message.guild.roles.find(r => r.name === "Riddle Submitted")
        message.member.addRole(riddlerrole)
        message.delete().catch()
        let riddleanswers = message.guild.channels.find(c => c.name === "elara-log")
        let riddleembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`Riddle submitted at`)
            .setTitle(`Riddle submitted`)
            .setDescription(`${message.content}`)
        riddleanswers.send(riddleembed)
        let dmembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(`Your riddle answer has been submitted\nand Have been given the **Riddle Submitted** Role,\nWhich means you can't post another answer until next week`)
            .setTimestamp()
            .setFooter(`Answer Submitted At`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        const dmembed2 = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${message.author.tag} I tried to dm, but their Dms are off`)
            .setDescription(`Your riddle answer has been submitted\nand Have been given the **Riddle Submitted** Role,\nWhich means you can't post another answer until next week`)
            .setFooter(`This message will delete in 10 seconds`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        try {
            await message.author.send(dmembed)
        } catch (err) {
            message.channel.send(dmembed2).then(message => {
                message.delete(10000)
            })
        }
    }
}