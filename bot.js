const { CommandoClient } = require('discord.js-commando'); // This Requires the discord.js-commando npm package
const config = require('./config.js'); // This requires all of the stuff from the config.js file
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const bot = new CommandoClient({ 
    commandPrefix: process.env.prefix, // This is the bots global prefix
    unknownCommandResponse: false, // This is so the bot doesn't reply if the command names are off
    owner: [process.env.owners], // Your User ID here
    invite: process.env.invite, // The Invite to your bot support server here.
});
fs.readdir("./events/", (err, files) => { // This Loads all of the event files from events/ folder
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
});
process.on('unhandledRejection', error => { // This handles when the bot has a issue it will log the issue in your console log.
    console.error(`ERROR: \n${error.stack}`);
});
bot.registry
    .registerDefaultTypes()
    .registerGroups([ // This sets the different groups of the commands for the bot. To add another one do ["groupnamehere", "The Display name here"] the group name has to be lower case in order for it to work.
        ['information', 'Information Commands'],
        ["fun", "Fun Commands"],
        ["botowner", "Bot Owner Commands"],
        ["moderation", "Moderation Commands"],
        ["imagecommands", "Image Commands"],
    ])
    .registerDefaultGroups() // This reqisters the default groups that come with discord.js-commando
    .registerDefaultCommands({ // This registers all of the default commands that come with discord.js-commando
        help: false,
        prefix: false,
        ping: false,
        eval_: false,
        commandState: true
    })
    .registerCommandsIn(path.join(__dirname, 'commands')); // This registers all of the commands under the commands folder.
bot.login(config.token); // This logs your bot into discord
