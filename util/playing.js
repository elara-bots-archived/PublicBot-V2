module.exports = (bot) => {
    bot.user.setActivity(`Public Bot!`, { type: "STREAMING", url: "https://www.twitch.tv/elarabots_discord" });
    var status = [
        `Public Discord Bot`
    ];
    setInterval(() => {
        let gameval = Math.floor((Math.random() * status.length));
        bot.user.setActivity(`${status[gameval]}`, { type: "STREAMING", url: "https://www.twitch.tv/elarabots_discord" });
    }, 10 * 1000);
}
// This is to set your bot's playing status it will randomize through the statuses