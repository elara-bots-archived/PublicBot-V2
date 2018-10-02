const Discord = require('discord.js');
module.exports.run = (bot, oldEmoji, newEmoji) => {
    let modlogs = newEmoji.guild.channels.find(c => c.name === "modlogs");
    if (!modlogs) return;
    let embed = new Discord.RichEmbed()
        .setColor(`PURPLE`)
        .setThumbnail(newEmoji.url)
        .setTitle(`Emoji Updated`)
        .setDescription(`Info`)
        .addField(`OldName`, oldEmoji.name, true)
        .addField(`NewName`, newEmoji.name, true)
        .addField(`ID`, newEmoji.id, true)
        .addField(`Emoji URL`, `[Click Here](${newEmoji.url})`, true)
        .addField(`Animated?`, newEmoji.animated, true)
        .setTimestamp(newEmoji.createdAt)
        .setFooter(`Emoji Updated At`)
    modlogs.send(embed)
}