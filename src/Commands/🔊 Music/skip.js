const {
    EmbedBuilder
} = require('discord.js');

class command {
    constructor() {
        this.name = "music-skip",
        this.description = "Permets de passer la musique actuel dans la file d'attente.",
        this.category = "🔊 Music",
        this.permission = "Aucune"
    }

    async execute(bot, interaction) {
        const queue = bot.player.nodes.get(interaction.guild);

        const Embed = new EmbedBuilder()
            .setColor(bot.config.embed.color)
            .setTimestamp()
            .setFooter({
                text: bot.config.bot.name,
                iconURL: bot.config.bot.logo
            });

        await interaction.deferReply();
 
        try {
            if(!queue || !queue.isPlaying()) return interaction.followUp({
                embeds: [
                    Embed.setDescription(`${bot.config.emoji.error} • Aucune musique en cours de lecture 🔊`)
                ]
            });

            await queue.node.skip();

            return interaction.followUp({
                embeds: [
                    Embed.setDescription(`${bot.config.emoji.valid} • La musique **${queue.currentTrack}** à bien été passer 🔊`)
                ]
            });
        } catch (e) {
            return interaction.followUp({
                embeds: [
                    Embed.setDescription(`${bot.config.emoji.error} • Une erreur est survenue : ${e}`)
                ]
            });
        }
    }
}

module.exports = command