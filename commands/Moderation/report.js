const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "report",
            memberName: "report",
            aliases: [],
            examples: ["e!report @user <reason here>"],
            description: "Reports the member to the server's staff",
            group: "moderation",
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "What user do you want to report to the server staff?",
                    type: "member"
                },
                {
                    key: 'content',
                    prompt: 'What is the reason for this report?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { member,content }) {
        let reason = content;
        let rUser = member;
        let servername = message.guild.name;
        let sIcon = message.guild.iconURL;
        let reportEmbed = new Discord.RichEmbed()
            .setTitle("User Report")
            .setColor("#2CE51A")
            .setThumbnail("https://cdn.discordapp.com/attachments/444028025932349441/445824984204705792/tenor_12.gif")
            .setFooter(`User Reported At`, sIcon)
            .setTimestamp()
            .addField("Reported User", `${rUser}`, true)
            .addField("Reported By", `${message.author}`, true)
            .addField("Reported in Channel:", message.channel)
            .addField("Reason", reason);

        let dmEmbed = new Discord.RichEmbed()
            .setTitle("Your Report")
            .setColor("#2CE51A")
            .addField("Reported By", `${message.author}`, true)
            .setThumbnail("https://cdn.discordapp.com/attachments/434973905485037578/434976194622914561/user_report.gif")
            .addField("Reported User", `${rUser}`, true)
            .addField("Thank You", "Your Report has been given to the Moderators of the Server, They will get back to you shortly.")
        let rUserembed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setTitle(`You Have Been Reported To the Server Moderators`)
            .addField(`Server`, `${servername}`, true)
            .addField(`Reason`, `${reason}`)
        rUser.send(rUserembed);
        let reportschannel = message.guild.channels.find(c => c.name === "modlogs");
        if (!reportschannel) return message.channel.send("Couldn't find modlogs");
        message.delete().catch();
        reportschannel.send(reportEmbed);
        message.author.send(dmEmbed);
    }
}