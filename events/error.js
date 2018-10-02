module.exports.run = (client, error) => {
    console.log(`ERR\n${error.stack}`)
    if (error.stack.includes("DiscordAPIError: Cannot execute action on a DM channel")) return;
}