const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    execute(interaction, bot) {
        try {
            if(!interaction.isCommand()) return;
            if(interaction.isStringSelectMenu()) return;
            
            const command = bot.commands.get(interaction.command.name);

            if(!command) return;
            if(!bot.commands.has(interaction.command.name)) return;
            if(!command.dm & !interaction.channel) return interaction.reply(`${bot.config.emoji.valid} • Vous ne pouvez pas executé cette commande en MP.`)

            command.execute(bot, interaction)
        } catch (error) {
            console.error(error)
        }
    }
}