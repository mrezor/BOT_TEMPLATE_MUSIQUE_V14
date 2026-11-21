const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');
const {
    Player
} = require('discord-player');
const {
    DefaultExtractors
} = require('@discord-player/extractor');

module.exports = async (bot) => {
    bot.player = new Player(bot, bot.config.opt.discordPlayer);

    await bot.player.extractors.loadMulti(DefaultExtractors);

    const Embed = new EmbedBuilder()
        .setColor(bot.config.embed.color)
        .setTimestamp()
        .setFooter({ text: bot.config.bot.name, iconURL: bot.config.bot.logo });

    bot.player.events.on('playerStart', async (queue, track) => {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('music_previous')
                .setEmoji('⏮️')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('music_pause_resume')
                .setEmoji('⏯️')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('music_stop')
                .setEmoji('⏹️')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('music_skip')
                .setEmoji('⏭️')
                .setStyle(ButtonStyle.Primary)
        );

        if (queue.metadata.panelMessage) {
            queue.metadata.panelMessage.edit({
                embeds: [
                    Embed.setDescription(`${bot.config.emoji.audio} • Lecture en cours : **${track.title}**\n${bot.config.emoji.user} • Ajouté par : ${track.requestedBy}`)
                ],
                components: [row]
            });
        } else {
            const msg = await queue.metadata.channel.send({
                embeds: [
                    Embed.setDescription(`${bot.config.emoji.audio} • Lecture en cours : **${track.title}**\n${bot.config.emoji.user} • Ajouté par : ${track.requestedBy}`)
                ],
                components: [row]
            });

            queue.metadata.panelMessage = msg;
        }
    });

    bot.player.events.on('audioTrackAdd', (queue, track) => {
        queue.metadata.channel.send({
            embeds: [
                Embed.setDescription(`${bot.config.emoji.valid} • La musique **"${track.title}"** as bien été ajouté à la file d'attente !`)
            ]
        });
    });

    bot.player.events.on('audioTracksAdd', (queue, track) => {
        queue.metadata.channel.send({
            embeds: [
                Embed.setDescription(`${bot.config.emoji.valid} • Plusieurs musique ajouté à la file d'attente !`)
            ]
        });
    });

    bot.player.events.on('disconnect', (queue) => {
        queue.metadata.channel.send({
            embeds: [
                Embed.setDescription(`${bot.config.emoji.error} • J'ai fini mon travaille, je déconnecte du salons !`)
            ]
        });
    });

    bot.player.events.on('emptyChannel', (queue) => {
        queue.metadata.channel.send({
            embeds: [
                Embed.setDescription(`${bot.config.emoji.error} • Personne n'est dans le canal vocal, je quitte le canal vocal !`)
            ]
        });
    });

    bot.player.events.on('emptyQueue', (queue) => {
        queue.metadata.channel.send({
            embeds: [
                Embed.setDescription(`${bot.config.emoji.valid} • J'ai fini de lire toute la file d'attente !`)
            ]
        });
    });

    bot.player.events.on('error', (queue, error) => {
        console.log(`Événement d'erreur générale du joueur: ${error.message}`);
        console.log(error);
    });

    bot.player.events.on('playerError', (queue, error) => {
        console.log(`Événement d'erreur du joueur: ${error.message}`);
        console.log(error);
    });
}