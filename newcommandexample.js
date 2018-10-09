//How to create a new command.

//1. Create a file the command folder example [ping.js]
//2. The basic command struct is this

const {Command} = require('discord.js-commando'), // This requires the discord.js-command npm package
 Discord = require('discord.js'); // This requires the discord.js npm package, This is mostly used for stuff like RichEmbed etc. 
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "", // the command name goes here
            memberName: "", // this is the same as the name above ^ 
            aliases: [], // Add any aliases to this command, like [`name here`, `other name here`] etc
            examples: [], // Give a example of how to do the command 
            description: "", //Give a description to the command example "This command shows the ping for the bot" etc.
            group: "" // Enter the group name for the command to go into all of the group names is found in bot.js at the bottom like fun
        })
    }
    async run(message) {
      // Add the code here for the bot to run when the command is called. 
    }
}
