const {
    EmbedBuilder,
    MessageFlags
} = require('discord.js');

class command {
    constructor() {
        this.name = "ping",
        this.description = "Permets de voir le ping du bot.",
        this.category = "⚙️ Outils",
        this.permission = "Aucune"
    }

    async execute(bot, interaction) {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(bot.config.embed.color)
                    .setTitle('**Ping**')
                    .setDescription("🏓 Pong")
                    .addFields(
                        {
                            name: '🔧 - Latence :',
                            value: `${bot.ws.ping}ms.`,
                            inline: false
                        },
                    )
                    .setTimestamp()
                    .setFooter({
                        text: bot.config.clients.name,
                        iconURL: bot.config.clients.logo
                    })
            ],
            flags: MessageFlags.Ephemeral
        });
    }
}

module.exports = command