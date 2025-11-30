const {
    Events,
    EmbedBuilder,
    MessageFlags
} = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, bot) {
        if (!interaction.isButton()) return;

        const queue = bot.player.nodes.get(interaction.guild);

        const Embed = new EmbedBuilder()
            .setColor(bot.config.embed.color)
            .setTimestamp()
            .setFooter({
                text: bot.config.bot.name,
                iconURL: bot.config.bot.logo
            });

        if (!queue || !queue.isPlaying()) return interaction.reply({
            embeds: [
                Embed.setDescription(`${bot.config.emoji.error} • Aucune musique en cours de lecture 🔊`)
            ]
        });

        switch (interaction.customId) {
            case 'music_previous':
                const lastSong = queue.history.previousTrack;

                await queue.history.previous();

                interaction.reply({
                    embeds: [
                        Embed.setDescription(`${bot.config.emoji.valid} • Suite à la demande de ${interaction.user}, je rejoue l'ancienne musique [**${lastSong.title}**](${lastSong.url}) 🔊`)
                    ]
                });

                break;
            case 'music_pause_resume':
                if (queue.node.isPaused()) {
                    queue.node.resume();

                    interaction.reply({
                        embeds: [
                            Embed.setDescription(`${bot.config.emoji.valid} • La musique à été reprise par ${interaction.user} !`)
                        ],
                    })
                } else {
                    queue.node.pause();

                    interaction.reply({
                        embeds: [
                            Embed.setDescription(`${bot.config.emoji.valid} • La musique à été mise en pause par ${interaction.user} !`)
                        ],
                    })
                }

                break;
            case 'music_stop':
                queue.delete(interaction.guild?.id);

                interaction.reply({
                    embeds: [
                        Embed.setDescription(`${bot.config.emoji.valid} • La musique à été stopper par ${interaction.user} !`)
                    ],
                })

                break;
            case 'music_skip':
                await queue.node.skip();

                interaction.reply({
                    embeds: [
                        Embed.setDescription(`${bot.config.emoji.valid} • ${interaction.user} à passer la musique en cours de lécture !`)
                    ],
                })

                break;
            default:
                break;
        }
    }
}