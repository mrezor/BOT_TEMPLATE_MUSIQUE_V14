const {
    EmbedBuilder
} = require('discord.js');

class command {
    constructor() {
        this.name = "music-stop",
        this.description = "Permets de stopper la musique.",
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
                    Embed.setDescription(`❌ | Aucune musique en cours de lecture 🔊`)
                ]
            });

            queue.delete(interaction.guild?.id);

            await interaction.followUp({
                embeds: [
                    Embed.setDescription(`✅ | La musique à bien été stopper 🔊`)
                ]
            });
        } catch (e) {
            return interaction.followUp({
                embeds: [
                    Embed.setDescription(`Une erreur est survenue : ${e}`)
                ]
            });
        }
    }
}

module.exports = command