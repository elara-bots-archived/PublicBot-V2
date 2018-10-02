const {Command} = require('discord.js-commando'),
    Discord = require('discord.js'),
    superagent = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ship",
            memberName: "ship",
            aliases: ["shipit"],
            group: "fun",
            guildOnly: true,
            examples: [`${client.commandPrefix}ship <@user> <@user>`],
            description: "Ships two members"
        })
    }
    async run(message) {
        message.channel.startTyping(true);
        const shipped = message.mentions.members.size === 2 ? message.mentions.members.array()[1] : message.member;
        const shipper = message.mentions.members.size === 1 || message.mentions.members.size === 2 ? message.mentions.members.array()[0] : message.member;
        const first_length = Math.round(shipper.displayName.length / 2);
        const first_half = shipper.displayName.slice(0, first_length);
        const second_length = Math.round(shipped.displayName.length / 2);
        const second_half = shipped.displayName.slice(second_length);
        const final_name = first_half + second_half;
        const score = Math.random() * (0, 100);
        const prog_bar = Math.ceil(Math.round(score) / 100 * 10);
        const counter = "▰".repeat(prog_bar) + "▱".repeat(10 - prog_bar);

        // const { body } = await superagent .get(`https://nekobot.xyz/api/imagegen?type=ship&user1=${shipper.user.displayAvatarURL}&user2=${shipped.user.displayAvatarURL}`);
         message.say({
            embed: {
                "title": `${shipper.displayName} <a:BlobHeart:495434217652617216> ${shipped.displayName}`,
                "description": `**Love %**\n${counter}\n\n${final_name}`,
                // "url": body.message,
                "color": 6192321,
                // "image": {
                //     "url": body.message
                // },
                "footer": {
                    "icon_url": message.author.displayAvatarURL,
                    "text": `Requested by ${message.author.tag}`
                }
            }
        })
        await message.channel.stopTyping(true);
    }
}