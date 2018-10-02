const {Command} = require('discord.js-commando'),
Discord = require('discord.js'),
config = require('../../config.js'),
search = require('youtube-search');
module.exports = class YtSearchCommand extends Command {
constructor(client){
    super(client, {
        name: "youtube",
        group: "information",
        aliases: ['yt'],
        description: "Searchs for a youtube video",
        memberName: "youtube",
        examples: [`${client.commandPrefix}yt <Channel Name or Video Search Name here>`],
         args: [
        {
            key: 'content',
            prompt: 'Which video do you want to find?',
            type: 'string'
        }
    ]
    })
}
async run (message, {content}) {
    let client = this.client;
    let args = content;
    if (args[0]) {
        var opts = {
            maxResults: 10,
            key: config.youtubeapi,
            type: 'video'
        };
        let nm = content
        message.react('476629550797684736')
        search(nm, opts, function (err, results) {
            let random = Math.floor((Math.random() * results.length));
            if (err) {
                message.say(`ERROR\n${err}`)
                console.log(err);
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(`PURPLE`)
                .setAuthor(client.user.username, client.user.avatarURL)
                .setTitle(results[random].title)
                .setDescription(`${results[random].description}`)
                .addField(`Link`, `${results[random].link}`)
                .setImage(results[random].thumbnails.high.url)
                .setTimestamp(results[random].publishedAt)
                .setFooter(`[YouTube] Search ${random}/10`, `http://www.creditlenders.info/wp-content/uploads/youtube-gaming-or-something-like-it-endgame-viable-youtube-gaming-logo.png`)
            message.say(embed2);
        });
    } else {
        message.react('482868924573155349')
        let color = '#C1192A';
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setTitle("Hm?")
            .setDescription("What video do you want to search for? " + "ed!" + "yt (query)")
        message.say(embed).catch(console.error);
    }
}
}