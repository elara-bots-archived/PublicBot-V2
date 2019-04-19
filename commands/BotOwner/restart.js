const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../config.js');
module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: "restart",
            aliases: ["rt"],
            memberName: "restart",
            group: "botowner",
            ownerOnly: true,
            description: "Restarts the bot"
        })
    }
    async run(message){
    message.channel.send(`Restarting....`)
    setTimeout(async () => {   
    this.client.destroy().then(this.client.login(config.token))
    }, 2000)
    }
}
