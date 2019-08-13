NOTICE
=====================
**All of this code is outdated**

**The updated code can be found at [PublicBot-Cmdo Repo](https://github.com/elara-bots/PublicBot-Cmdo)**


[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://dashboard.heroku.com/new?template=https://github.com/Elara-Discord-Bots/PublicBot-V2)

Welcome to the Public Version of Elara.
===========================================

Self Hosting Guide: [Click Here](https://github.com/Elara-Discord-Bots/PublicBot-V2/wiki)



DISCLAIMER
===========================
**I(SUPERCHIEFYT) ain't responsable if you mess up and leak your bot's token etc, Follow the guide listed above ^**

**If you have any questions join the support server below and ask there.**


The Support Servers
====================
[![Discord server](https://discordapp.com/api/guilds/499409162661396481/embed.png?style=banner4)](https://discord.gg/qafHJ63)
[![Discord server](https://discordapp.com/api/guilds/371105897570631691/embed.png?style=banner4)](https://discord.gg/NGdVDgk)



Command Format
=========================
```js
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
