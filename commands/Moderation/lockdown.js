const {Command} = require('discord.js-commando'),
Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client){
        super(client, {
            name: "lockdown",
            memberName: "lockdown",
            aliases: ["ld"],
            group: "moderation",
            guildOnly: true,
            userPermissions: ["MANAGE_GUILD"],
            examples: [`${client.commandPrefix}lockdown`],
            description: "Locks down the channel you run the command in."
        }) 
    }
    async run(message){
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        });
        const lockembed = new Discord.RichEmbed()
            .setColor(`#FF000`)
            .setDescription(`<@${message.author.id}> This Channel is now in Lockdown Mode to Deactivate the LockDown do **${client.commandPrefix}unlock**`)
        message.channel.send(lockembed)
    }
}