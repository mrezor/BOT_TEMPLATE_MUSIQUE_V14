module.exports = {
    bot: {
        token: 'YOUR TOKEN',
        activity: 'by MRezor ❤️',
        name: 'by MRezor ❤️',
        logo: 'https://images-ext-1.discordapp.net/external/7CTpaPKCXMBYnDPh2pu9sic-1568RjXelLnUPCEIw-g/https/cdn.discordapp.com/avatars/843796161407746089/45d9acd8917467a6f2de52205655908b.webp',
    },

    embed: {
        color: 'Random'
    },

    emoji: {
        valid: '✅',
        error: '❌'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
