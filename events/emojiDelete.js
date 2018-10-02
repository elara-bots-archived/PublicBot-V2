const Discord = require('discord.js');
module.exports.run = (bot, emoji) => {
    let modlogs = emoji.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let embed = new Discord.RichEmbed()
        .setColor(`RED`)
        .setThumbnail(emoji.url)
        .setTitle(`Emoji Deleted`)
        .setDescription(`Info`)
        .addField(`Name`, emoji.name, true)
        .addField(`ID`, emoji.id, true)
        .addField(`Emoji URL`, `[Click Here](${emoji.url})`, true)
        .addField(`Animated?`, emoji.animated, true)
        .setTimestamp(emoji.createdAt)
        .setFooter(`Emoji Deleted At`)
    modlogs.send(embed)
}