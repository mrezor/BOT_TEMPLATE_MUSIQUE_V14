const {
    EmbedBuilder,
    ApplicationCommandOptionType,
    MessageFlags
} = require('discord.js');

class command {
    constructor() {
        this.name = "music-play",
        this.description = "Permets de démarrer une musique.",
        this.category = "🔊 Music",
        this.permission = "Aucune",
        this.options = [
            { 
                type: ApplicationCommandOptionType.String,
                name: "music",
                description: "Écrivez le titre d'une musique",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {
        const channel = interaction.member.voice.channel;
        const args = interaction.options.getString('music');

        const Embed = new EmbedBuilder()
            .setColor(bot.config.embed.color)
            .setTimestamp()
            .setFooter({
                text: bot.config.bot.name,
                iconURL: bot.config.bot.logo
            });

        if (!channel) return interaction.reply({
            embeds: [
                Embed.setDescription(`${bot.config.emoji.error} • Tu dois être dans un salon vocal pour jouer une musique !`)
            ]
        });

        await interaction.deferReply({
            flags: MessageFlags.Ephemeral
        });
 
        try {
            const { track } = await bot.player.play(channel, args, {
                nodeOptions: {
                    leaveOnStop: true,
                    metadata: interaction
                }
            });
     
            return interaction.followUp({
                embeds: [
                    Embed.setDescription(`${bot.config.emoji.valid} • La musique **${track.title}** as bien été trouvé 🔊`)
                ],
                flags: MessageFlags.Ephemeral
            });
        } catch (e) {
            return interaction.followUp({
                embeds: [
                    Embed.setDescription(`${bot.config.emoji.error} • Une erreur est survenue : ${e}`)
                ],
                flags: MessageFlags.Ephemeral
            });
        }
    }
}

module.exports = command