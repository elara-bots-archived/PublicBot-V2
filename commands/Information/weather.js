const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const weather = require('weather-js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "weather",
            memberName: "weather",
            aliases: [],
            examples: [`${client.commandPrefix}weather London`],
            description: "Gives you the weather in the city you choose..",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: 'Please provide a city..',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        weather.find({ search: content, degreeType: 'C' }, function (err, result) {
            if (err) message.channel.send(err);
            if (result === undefined || result.length === 0) {
                message.channel.send('**Please enter a location!**')
                return;
            }
            var current = result[0].current;
            var location = result[0].location;
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', location.degreetype, true)
                .addField('Temperature', `${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
            message.channel.send({ embed });
        })
    }
}