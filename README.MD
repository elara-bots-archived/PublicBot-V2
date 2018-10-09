Welcome to the Public Version of Elara.
===========================================

Getting started.
1. Go to https://discordapp.com/developers/applications/ sign in and create a bot user account, grab the bot token then put it in config.js 
(Note: If you are going to host this bot on a hosting site do not add your bots token to config.js [DO NOT SHARE YOUR BOT TOKEN WITH ANYONE!])
2. Go to bot.js you will need to add the prefix you want the bot to have and you will need to add your ID in there aswell.. This is for the bot owner commands [Note: Do not add anyone else in there unless you want them to have full access to your bot.]
3. To download all of the required packages do [npm i] in the console and it will install them all.
4. I have labeled everything in bot.js to explain what everything does etc.
5. You will need to get your own api keys for [youtube, twitch, fortnite, giphy] Links here -->
Twitch: https://dev.twitch.tv
Youtube: https://console.developers.google.com/projectselector/apis/credentials?supportedpurview=project
Fortnite: https://fortnitetracker.com/site-api
Giphy: https://developers.giphy.com

The Support Server
====================
<html>
  <p>
    <a href="https://discord.gg/hgsM86w"><img src="https://canary.discordapp.com/api/guilds/371105897570631691/widget.png?style=banner2" alt="Join Discord Server"/></a>
  </p>
</html>


How to create a new command.
===============================
1. Create a file the command folder example [ping.js]
2. The basic command struct is this
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
