const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const spc = require("spacetime"),
    tzdb = JSON.parse(require("fs").readFileSync('tz.json'));

module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "time",
            memberName: "time",
            aliases: ["times"],
            examples: [`${client.commandPrefix}time <location here>`],
            description: "Gives you the time.",
            group: "information",
            args: [
                {
                    key: 'content',
                    prompt: `What Place do you want the time of?..\nIf you ain't sure on what timezones there are do \`${client.commandPrefix}time list\``,
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }) {

            if (content.length > 1) {
                const argstotal = content;
                if (argstotal === "list")
                    return await msg.say(`Sent the Information in your dms.`).then(msg.direct({
                        embed: {
                            title: "Here is a list of timezones that are available.",
                            description: `To use them, simply do \`\`${this.client.commandPrefix}time <timezone>.\`\``,
                            fields: provideList(tzdb),
                            timestamp: new Date()
                        }
                    }));

                if (!tzdb.some(x => x.name === argstotal))
                    return await msg.say("I couldn't find any place like this. Are you sure you weren't lost?");

                const curenttime = spc.now(tzdb.find(x => x.name === argstotal).value);
                return await msg.say({
                    embed: {
                        title: `Current time (${argstotal}):`,
                        description: curenttime.format('nice-day').toString(),
                        fields: [{
                            name: "Need help?",
                            value: `Do \`\`${this.client.commandPrefix}time list\`\` to get a list of available timezones!`
                        }],
                        timestamp: new Date()
                    }
                });
            }

        function provideList(arr) {
            const buf = arr.map(x => x.name);
            let strr = [];
            for (let i = 0; i < 7; i++) {
                strr[strr.length] = {
                    name: "Continued",
                    value: `\`\`\`${buf.splice(0, 80).join("\n")}\`\`\``
                };
            }
            return strr;
        }
    }
}