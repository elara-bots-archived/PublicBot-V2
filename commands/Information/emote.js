const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const DJSUtils = require('discord.js/src/util/Util');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "emote",
            memberName: "emote",
            aliases: ["emojifind", "emojisearch"],
            examples: [`${client.commandPrefix}emote <emoji name here>`],
            description: "This will post information about the emoji you search for.",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: 'What emoji do you want me to get the info about?',
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }) {
        let color;
        let client = this.client
        if(msg.guild){
            color = msg.member.displayColor
        }else{
            color = "RANDOM"
        }
        const emoji = args[0].split(/\s+/)[0];
        let parsedEmoji = DJSUtils.parseEmoji(emoji);
        if (/^\d{17,19}/.test(emoji)) {
            parsedEmoji = { id: String(emoji), animated: "unknown" };
        }
    if (!parsedEmoji) {
        let e = new Discord.RichEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setTitle(`ERROR`)
        .setDescription(`That isn't an emoji!`)
        .setColor(`#FF0000`)
        msg.channel.send(e)
} else 
    
    if (parsedEmoji && !parsedEmoji.id) {
        let e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setDescription(`That is a unicode emoji!`)
        .setTitle(`INFO`)
        .setFooter(`The command works best for custom emojis.`, msg.author.displayAvatarURL)
        msg.channel.send(e)
} else
    
    if (parsedEmoji && parsedEmoji.id) {
			const globalEmoji = client.emojis.get(parsedEmoji.id);
			if (globalEmoji) {
                let e = new Discord.RichEmbed()
                .setColor(color)
                .setAuthor(client.user.tag, client.user.displayAvatarURL)
                .setDescription(`
                **Emoji: **${globalEmoji.name}
                **ID: **${globalEmoji.id}
                **Animated: **${globalEmoji.animated ? "Yes" : "No"}
                **Global Emoji: ** ${globalEmoji.name.startsWith("GW") ? "Yes" : "No"}
                **URL: **[Click Here](${globalEmoji.url})
                **Managed by a Service: **${globalEmoji.managed ? "Yes": "No"}
                **Roles: **${globalEmoji.roles.sort((a, b) => b.position - a.position).map(r => r.toString()).join("\n") ? globalEmoji.roles.sort((a, b) => b.position - a.position).map(r => `@${r.name}`).join("\n» ") : "None"}
                **Server: **${globalEmoji.guild.name} (${globalEmoji.guild.id})
                `)
                .setThumbnail(globalEmoji.url)
                msg.channel.send(e)       
            }else{
                let url = `${parsedEmoji.animated !== "unknown" ? `${ client.options.http.cdn }/emojis/${ parsedEmoji.id }.${ parsedEmoji.animated === true ? "gif" : "png" }` : ""}`
                let e = new Discord.RichEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL)
                .setColor(color)
                .setDescription(`
                **Name: **${parsedEmoji.name ? `${parsedEmoji.name}` : ""}
                **ID: **${parsedEmoji.id}
                **Animated: **${parsedEmoji.animated === "unknown" ? `Unknown.` : parsedEmoji.animated === true ? `Yes` : `No`}
                **Global Emoji: ** ${parsedEmoji.name.startsWith("GW") ? "Yes" : "No"}
                **URL: **[Click Here](${url})
                `)
                e.setThumbnail(url)
                msg.channel.send(e)
                }
    }
    }
}
