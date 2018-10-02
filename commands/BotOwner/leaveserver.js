const {Command} = require('discord.js-commando'),
Discord = require('discord.js'),
config = require('../../config.js');
module.exports = class LSCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leaveserver",
            group: 'botowner',
            ownerOnly: true,
            aliases: ["ls"],
            description: "Makes the bot leave the server",
            examples: [`${client.commandPrefix}leaveserver <Server ID>`],
            memberName: "leaveserver",
            args: [{
                key: "server",
                prompt: "What server do you want me to leave?",
                type: "string"
            }]
        })
    }
    async run(message, {server}){
       let guild =  this.client.guilds.get(server);
        let defaultChannel = "";
        guild.channels.forEach((channel) => {
            if (channel.type == "text" && defaultChannel == "") {
                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES" && "EMBED_LINKS" && "READ_MESSAGES")) {
                    defaultChannel = channel;
                }
            }
        })
            let embed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`I have been removed from this server, For more information please contact [${this.client.owners[0].tag}](https://discord.gg/hgsM86w)`)
            defaultChannel.send(embed).then(guild.leave());
    }
}