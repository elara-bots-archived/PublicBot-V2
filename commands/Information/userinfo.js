const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment-timezone')
module.exports = class WhoisCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            memberName: 'userinfo',
            group: 'information',
            aliases: [],
            description: 'Gets information about a user.',
            format: 'UserID|UserName(partial or full)',
            examples: ['e!userinfo @user'],
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want the info about?',
                    type: 'user'
                }
            ]
        })
    }

    async run(msg, { user }) {
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail(user.displayAvatarURL)
            .setTimestamp()
            .addField(`❯\u2000\Mention`, user, true)
            .addField(`❯\u2000\Tag`, user.tag, true)
            .addField(`❯\u2000\Name`, user.username, true)
            .addField(`❯\u2000\User ID`, user.id, true)
            .addField(`❯\u2000\Discriminator`, `#${user.discriminator}`, true)
            .addField(`❯\u2000\Avatar URL`, `[Click Here](${user.displayAvatarURL})`, true)
            .addField(`❯\u2000\Bot`, user.bot ? 'Yes' : 'No', true)
            .addField(`❯\u2000\Bot Owner`, `${user.id !== "288450828837322764" && user.id !== "391529339214364674" && user.id !== "440810964061913119" ? "No" : "Yes, Hi Boss <:SmileyHearts:485361754633797654>"}`, true)
            .addField(`❯\u2000\Account Created At`, `${moment(user.createdAt).format('dddd, MMMM Do YYYY')}\n${moment(user.createdAt).format('h:mm:ss a zz')}`, true)
        msg.say(embed)
    }
}