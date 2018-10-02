const { splitMessage } = require('discord.js');
const { stripIndents, oneLine } = require('common-tags');
const {Command} = require('discord.js-commando');
const { disambiguation } = require('util');
const Discord = require('discord.js');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'information',
            memberName: 'help',
            aliases: ['commands'],
            description: 'Displays a list of available commands, or detailed information for a specified command.',
            details: oneLine`
				The command may be part of a command name or a whole command name.
				If it isn't specified, all available commands will be listed.
			`,
            examples: [`${client.commandPrefix}help`, `${client.commandPrefix}help prefix`],
            guarded: true,

            args: [{
                key: 'command',
                prompt: 'Which command would you like to view the help for?',
                type: 'string',
                default: ''
            }]
        });
    }

    async run(msg, args) { // eslint-disable-line complexity
        msg.delete(15000).catch();
        const groups = this.client.registry.groups;
        const commands = this.client.registry.findCommands(args.command, false, msg);
        const showAll = args.command && args.command.toLowerCase() === 'all';
        if (args.command && !showAll) {
            if (commands.length === 1) {
                let help = stripIndents`
					${oneLine`
						__Command **${commands[0].name}**:__ ${commands[0].description}
						${commands[0].guildOnly ? ' (Usable only in servers)' : ''}
						${commands[0].nsfw ? ' (NSFW)' : ''}
					`}

					**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}
				`;
                if (commands[0].aliases.length > 0) help += `\n**Aliases:** ${commands[0].aliases.join(', ')}`;
                help += `\n${oneLine`
					**Group:** ${commands[0].group.name}
					(\`${commands[0].groupID}:${commands[0].memberName}\`)
				`}`;
                if (commands[0].details) help += `\n**Details:** ${commands[0].details}`;
                if (commands[0].examples) help += `\n**Examples:**\n${commands[0].examples.join('\n')}`;

                const messages = [];
                try {
                    messages.push(await msg.embed({
                        color: msg.guild ? msg.member.displayColor : 16711749,
                        description: help
                    }));
                } catch (err) {
                    messages.push(await msg.embed({
                        color: msg.guild ? msg.member.displayColor : 16711749,
                        decription: 'Unable to send you the help message.'
                    }, '', { reply: this.client.user }));
                }
                return messages;
            } else if (commands.length > 15) {
                return msg.embed({
                    color: msg.guild ? msg.member.displayColor : 16711749,
                    description: 'Multiple commands found. Please be more specific.'
                }, '', { reply: this.client.user });
            } else if (commands.length > 1) {
                return msg.embed({
                    color: msg.guild ? msg.member.displayColor : 16711749,
                    description: disambiguation(commands, 'commands')
                }, '', { reply: this.client.user });
            } else {
                return msg.embed({
                    color: msg.guild ? msg.member.displayColor : 16711749,
                    description: `Unable to identify command. Use ${msg.usage(
                        null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined
                    )} to view the list of all commands.`
                }, '', { reply: msg.author });
            }
        } else {
            const messages = [];
            try {
                const body = stripIndents`
				${oneLine`
					To run a command in ${msg.guild || 'any server'},
					use ${Command.usage('command', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
					For example, ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
				`}

				Use ${this.usage('<command>', null, null)} to view detailed information about a specific command.
				Use ${this.usage('all', null, null)} to view a list of *all* commands, not just available ones.

				__**${showAll ? 'All commands' : `Available commands in ${msg.guild || 'this DM'}`}**__

				${(showAll ? groups : groups.filter(grp => grp.commands.some(cmd => cmd.isUsable(msg))))
                        .map(grp => stripIndents`
						__${grp.name}__
						${(showAll ? grp.commands : grp.commands.filter(cmd => cmd.isUsable(msg)))
                                .map(cmd => `**${cmd.name}:** ${cmd.description}${cmd.nsfw ? ' (NSFW)' : ''}`).join('\n')
                            }
					`).join('\n\n')
                    }`;

                if (body.length >= 2000) {
                    const splitContent = splitMessage(body);

                    for (const part in splitContent) {
                        let embed = new Discord.RichEmbed()
                            .setDescription(splitContent[part])
                            .setColor(`RANDOM`)
                        messages.push(await msg.direct(embed));
                    }
                    if (msg.channel.type === "dm") return;
                    let embed2 = new Discord.RichEmbed()
                        .setColor(`RANDOM`)
                        .setDescription(`Sent the information in your dms.`)
                        .setFooter(`Requested By ${msg.author.tag}`, msg.author.displayAvatarURL)
                    if (msg.channel.type === "text") return msg.embed(embed2).then(message => message.delete(15000).catch())
                } else {
                    messages.push(await msg.embed({ // eslint-disable-line no-await-in-loop
                        color: msg.guild ? msg.member.displayColor : 16711749,
                        description: body
                    }));
                }
            } catch (err) {
                messages.push(await msg.reply('Unable to send you the help message.'));
            }
            return messages;
        }
    }
};
