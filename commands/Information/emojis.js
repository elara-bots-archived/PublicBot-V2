const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client,
            {
                name: "emojis",
                memberName: "emojis",
                group: "information",
                description: "Shows servers emojis",
                examples: [`${client.commandPrefix}emojis`],
                guildOnly: true,
                aliases: ["emotes"]
            });
    }
    async run(msg) {
        let animEmotes = [],
            staticEmotes = [];

        msg.guild.emojis.forEach((e) => {
            e.animated ? animEmotes.push(`<a:${e.name}:${e.id}>`) : staticEmotes.push(`<:${e.name}:${e.id}>`);
        });
        staticEmotes = staticEmotes.length !== 0 ? `__**[${staticEmotes.length}] Normal Emotes**__\n${staticEmotes.join('')}` : '';
        animEmotes = animEmotes.length !== 0 ? `\n\n__**[${animEmotes.length}] Animated Emotes**__\n${animEmotes.join('')}` : '';
        let botembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(staticEmotes + animEmotes)
            .setAuthor(`${msg.guild.name} Emojis`, msg.guild.iconURL)
            .setTimestamp()
        msg.embed(botembed)
    }
}