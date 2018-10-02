const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment-timezone')
const perms = require('../../util/perms.json');
const {arrayClean} = require('../../util/util.js');
module.exports = class WhoisCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'whois',
            memberName: 'whois',
            group: 'information',
            aliases: [],
            description: 'Gets information about a user.',
            format: 'MemberID|MemberName(partial or full)',
            examples: ['e!whois @user'],
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 3
            },
        args: [
            {
                key: 'member',
                prompt: 'What member do you want the info about?',
                type: 'member'
            }
        ]
    })}
    
    async run (msg, {member}) {
        const allowed = Object.entries(member.permissions.serialize()).filter(([perm, allowed]) => allowed).map(([perm]) => "`" + perms[perm] + "`").join(',   ');

        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail(member.user.displayAvatarURL)
            .setTimestamp()
            .addField(`❯\u2000\Mention`, member.user, true)
            .addField(`❯\u2000\Tag`, member.user.tag, true)
            .addField(`❯\u2000\Name`, member.user.username, true)
            .addField(`❯\u2000\Nickname`, member.nickname ? member.nickname : 'No Nickname', true)
            .addField(`❯\u2000\User ID`, member.id, true)
            .addField(`❯\u2000\Discriminator`, `#${member.user.discriminator}`, true)
            .addField(`❯\u2000\Bot`, member.user.bot ? 'Yes' : 'No', true)
            .addField(`❯\u2000\Bot Owner`, `${member.user.id !== "288450828837322764" && member.user.id !== "391529339214364674" && member.user.id !== "440810964061913119" ? "No" : "Yes, Hi Boss <:SmileyHearts:485361754633797654>"}`, true)
            .addField("❯\u2000\Status", member.presence.status.toUpperCase(), true)
            .addField(`❯\u2000\Game`, member.presence.game ? member.presence.game.name : 'N/A', true)
            .addField(`❯\u2000\Avatar URL`, `[Click Here](${member.user.displayAvatarURL})`)
            .addBlankField()
            .addField(`❯\u2000\Account Created At`, `${moment(member.user.createdAt).format('dddd, MMMM Do YYYY')}\n${moment(member.user.createdAt).format('h:mm:ss a zz')}`, true)
            .addField(`❯\u2000\Joined Server At`, `${moment(member.joinedAt).format('dddd, MMMM Do YYYY')}\n${moment(member.joinedAt).format('h:mm:ss a zz')}`, true)
            .addBlankField()
            .addField('❯\u2000\Highest Role', member.roles.size > 1 ? member.highestRole : 'N/A', true)
            .addField('❯\u2000\Highest Role Hoisted', member.highestRole.hoist ? "Yes" : "No", true)
            .addField(`❯\u2000\**Permissions**`, allowed ? `•\u2000${allowed}` : '•\u2000\None')
            // .addField(`Roles [${member.roles.size}]`, `${member.roles.sort((b, a) => { return a.position - b.position }).map(role => `${role}`).join(" | ")}`)
            .addField(`❯\u2000\Role(s)`, member.roles.size > 1 ? arrayClean(null, member.roles.map((r) => {
                if (r.name !== '@everyone') {
                    return r;
                }

                return null;
            })).join(' | ') : 'None', false)
        msg.say(embed)
    }
}