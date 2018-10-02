const { Command } = require('discord.js-commando'),
    Discord = require('discord.js'),
    {cookies} = require('../../util/photos.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "cookie",
            memberName: "cookie",
            aliases: ["cookies"],
            examples: ["e!cookie @user"],
            description: "Gives a Cookie to a user",
            group: "imagecommands",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to give a cookie to?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, {user}) {
       try{ 
        const replies = cookies;
        let cUser = user;
        if(cUser.id === message.author.id) return message.say(`You can't give yourself a cookie silly :wink:`)
        let usernameid = message.author;
        let result = Math.floor((Math.random() * replies.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading the Command, Please Wait.,,,,")

        message.channel.send(embed).then(message => {
            embed.setColor("#000FF")
            embed.setDescription(`${usernameid} Has Given a Cookie to ${cUser}:cookie::yum::cookie:`)
            embed.setImage(replies[result])
            embed.setFooter(`Cookie Photo/Gif ${result}/${replies.length}`)
            message.edit(embed)
        })
    } catch(e){

    }
}
}