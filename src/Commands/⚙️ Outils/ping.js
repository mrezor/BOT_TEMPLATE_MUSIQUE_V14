const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "ping",
        this.description = "Permets de voir le ping du bot.",
        this.category = "⚙️ Outils",
        this.permission = "Aucune"
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('**Ping**')
            .setDescription("🏓 Pong")
            .addFields(
                { name: '🔧 - Latence :', value: `${bot.ws.ping}ms.` },
            )
            .setTimestamp()
            .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

        interaction.reply({ embeds: [Embed], ephemeral: false });
    }
}

module.exports = command