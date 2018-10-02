const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "banlist",
            memberName: "banlist",
            aliases: [],
            examples: [`${client.commandPrefix}banlist`],
            description: "Gives you a list of the current bans in the server.",
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_MESSAGES", "BAN_MEMBERS", "MANAGE_GUILD", "ADMINISTRATOR"]
        })
    }
    async run(message) {

        const bans = new Map();
            message.guild.fetchBans().then(g => {
                bans[g.id] = g;
                let banlist = (`${bans[g.id].map(ge => `\n (${ge.username}) (${ge.id})`).join('\n')}`)
                let noembed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setDescription(`No bans on this server.`)
                .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : "https://images-ext-2.discordapp.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discordapp.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
                if(banlist.length === 0) return message.channel.send(noembed)
                const embed = new Discord.RichEmbed()
                    .setDescription(banlist)
                    .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : "https://images-ext-2.discordapp.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discordapp.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
                    .setColor(`RANDOM`)
                message.channel.send(embed)
        });
    }
}