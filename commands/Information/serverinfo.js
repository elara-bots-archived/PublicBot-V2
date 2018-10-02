const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            memberName: "serverinfo",
            aliases: ["guildinfo", "si", "gi"],
            examples: [`${client.commandPrefix}serverinfo`],
            description: "Gives you a all of the information about the guild.",
            group: "information",
            guildOnly: true
        })
    }
    async run(msg) {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
        let guild = msg.channel.guild
        let serverSize = msg.guild.memberCount;
        let botCount = msg.guild.members.filter(m => m.user.bot).size;
        let humanCount = serverSize - botCount;
        let verifLevels = ["None", "Low\nmust have verified\nemail on account", "Medium - must be registered on Discord for longer than 5 minutes", "High -  (╯°□°）╯︵ ┻━┻ - must be a member of the server for longer than 10 minutes", "Very High - ┻━┻ミヽ(ಠ益ಠ)ﾉ彡┻━┻ - must have a verified phone number"];
        let region = {
            "brazil": "Brazil",
            "eu-central": "Central Europe",
            "singapore": "Singapore",
            "us-central": "U.S. Central",
            "sydney": "Sydney",
            "us-east": "U.S. East",
            "us-south": "U.S. South",
            "us-west": "U.S. West",
            "eu-west": "Western Europe",
            "vip-us-east": "VIP U.S. East",
            "london": "London",
            "amsterdam": "Amsterdam",
            "hongkong": "Hong Kong"
        };
        let fields = []
        fields.push(
            {
            name: 'Server Name',
            value: `**${guild.name}**`,
            inline: true
            }, 
            {
                name: `Server ID`,
                value: `${msg.guild.id}`,
                inline: true
            },
            {
                name: 'Owner',
                value: `${guild.owner}`,
                inline: true
            }, 
            {
                name: 'Owner ID',
                value: `${guild.ownerID}`,
                inline: true
            }, 
            {
                name: 'Verification Level',
                value: `${verifLevels[msg.guild.verificationLevel]}`,
                inline: true
            }, 
            {
                name: `Region`,
                value: `${region[msg.guild.region]}`,
                inline: true
            },
            {
                name: 'Total Members',
                value: `${serverSize}`,
                inline: true
            }, 
            {
                name: `Total Humans`,
                value: `${humanCount}`,
                inline: true
            },
            {
                name: `Total Bots`,
                value: `${botCount}`,
                inline: true
            },
            {
                name: 'Role Count',
                value: `${guild.roles.size}`,
                inline: true
            },
            {
                name: 'Partnership',
                value: `${guild.features.length === 0 ? 'No' : `Yes, features: ${guild.features.map(feature => `\`${feature}\``).join(', ')}`}`,
                inline: true
            }, 
            {
                name: `Created At`,
                value: `${msg.guild.createdAt.toString().substr(0, 15)},\n${checkDays(msg.guild.createdAt)}`, 
                inline: true
            },
            {
                name: 'Channels',
                value: `Text: [${msg.guild.channels.filter(c => c.type == "text").size}]\nVoice: [${msg.guild.channels.filter(c => c.type == "voice").size}]\nCategory: [${msg.guild.channels.filter(c => c.type == "category").size}]`,
                inline: true
            }, 
            {
                name: `Member Statuses`,
                value: `**${msg.guild.members.filter(o => o.presence.status === 'online').size}** Online\n**${msg.guild.members.filter(i => i.presence.status === 'idle').size}** Idle/Away\n**${msg.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${msg.guild.members.filter(off => off.presence.status === 'offline').size}** Offline/Invisible`,
                inline: true
            },
            {
                name: `Server Roles`,
                value: `Type **${this.client.commandPrefix}roles** to see \nthe Server roles`,
                inline: true
            },
            {
                name: `Server Channels`,
                value: `Type **${this.client.commandPrefix}channels** to see \nthe Server Channels`,
                inline: true
            },
            {
                name: "Server Emojis",
                value: `Type **${this.client.commandPrefix}emojis** to see\nthe Server Emojis`,
                inline: true
            }
        )
            send()

        function send() {
            msg.channel.send({
                embed: {
                    timestamp: new Date(msg.timestamp),
                    thumbnail: {
                        url: guild.iconURL ? guild.iconURL : `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                    },
                    fields: fields
                }
            }).catch(() => { })
        }
    }

}