const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "twitch",
            memberName: "twitch",
            aliases: [],
            examples: [`${client.commandPrefix}twitch Ninja`],
            description: "",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: 'What twitch user do you want the link to?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        const query = new URLSearchParams([['client_id', config.twitch]]);
        const url = new URL(`https://api.twitch.tv/kraken/channels/${encodeURIComponent(content)}`);
        url.search = query;

        const body = await fetch(url)
            .then(response => response.json())
            .catch(() => {  message.say('Unable to find account. Did you spell it correctly?') });
        if (!body.url) return message.say(`Unable to find account. Did you spell it correctly?`)
        if(!body.display_name) return message.say(`Unable to find that account, Did you spell it correctly?`)
        const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail(body.logo)
            .setAuthor(body.display_name, `${body.logo ? body.logo : "https://cdn.discordapp.com/attachments/444028025932349441/467664998081232896/logo_twitch_iosversion_by_akiruuu-d9djk9s.png"}`)
            .addField(`Name`, `${body.display_name}`, true)
            .addField('Account ID', body._id, true)
            .addField(`Channel link`, `[Click Here](${body.url})`, true)
            .addField(`Mature`, `${body.mature ? "Yes" : "No"}`, true)
            .addField(`Partnered`, `${body.partner ? "Yes" : "No"}`, true)
            .addField(`Current Game`, `${body.game ? body.game : "N/A"}`, true)
            .addField('Followers', body.followers, true)
            .addField('Created On', body.created_at, true)
            .addField(`Updated At`, body.updated_at, true)
            .addField('Channel Views', body.views, true)
            .addField(`Current Status`, `${body.status ? body.status : "N/A"}`, true)
            .setImage(body.profile_banner)
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)

        message.embed(embed);

    }
}