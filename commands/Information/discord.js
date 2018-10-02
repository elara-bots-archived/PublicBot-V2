const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "discord",
            memberName: "discord",
            aliases: [],
            examples: [`${client.commandPrefix}discord`],
            description: "Gives you a discord invite for the discord.",
            group: "information",
            guildOnly: true
        })
    }
    async run(message) {
        if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES" && "EMBED_LINKS" && "READ_MESSAGES" && "CREATE_INSTANT_INVITE")) {
            message.say(`ERROR\n I can't create a discord invite in this channel!`)
            
        } else {
        var options = {
            maxAge: 0
        };
        let usermade = message.author
        let botembed = new Discord.RichEmbed()
            .setColor("#000FF")
            .setDescription(`<a:Dots:426956230582599690> Creating......`)
            .setTimestamp()
        message.delete(15000).catch()
        message.channel.send(botembed).then(message => {
            message.channel.createInvite(options).then(i => {
                botembed.setColor("#000FF")
                botembed.setFooter(`This message will delete in 15 Seconds.`)
                botembed.setDescription(`Created an Invite For you ${usermade}. \n https://discord.gg/${i.code}`)
                botembed.setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                botembed.setTimestamp()
                message.edit(botembed).then(message => {
                    message.delete(15000).catch()
                })

            })
        })
    }
    }
}