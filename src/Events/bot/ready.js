const {
    ActivityType,
    Events,
    PresenceUpdateStatus
} = require('discord.js');
const os = require("os");
const process = require("process");
const package = require('../../../package.json');
const eventHandler = require('../../Structure/Handler/Event');

module.exports = {
    name: Events.ClientReady,
    execute(bot) {
        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const cpuModel = os.cpus()[0].model;
        const cpuCores = os.cpus().length;

        console.log('\x1b[33m' + `• Utilisateur: \x1b[39m${bot.user.username}\n`
            + '\x1b[33m' + `• Commands: \x1b[39m${bot.commands.size}\n`
            + '\x1b[33m' + `• Events: \x1b[39m${eventHandler.getEventCount()}\n`
            + '\x1b[33m' + `• Serveurs: \x1b[39m${bot.guilds.cache.size}\n`
            + '\x1b[33m' + `• Membres: \x1b[39m${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\n`
            + '\x1b[33m' + `• Salons: \x1b[39m${bot.channels.cache.size}\n`
            + '\x1b[33m' + `• RAM: \x1b[39m${usedMemory} MB / ${totalMemory} GB\n`
            + '\x1b[33m' + `• Processeur: \x1b[39m${cpuModel} (${cpuCores} cœurs)\n`
            + '\x1b[33m' + `• Salons: \x1b[39m${bot.channels.cache.size}\n`
            + '\x1b[33m' + `• Version: \x1b[39m${package.version}\n`
            + '\x1b[33m' + `• Version Node.JS: \x1b[39m${process.version.replace('v', '')}\n`
            + '\x1b[33m' + `• Version discord.js: \x1b[39m${package.dependencies['discord.js'].toString().replace('^', "").trim()}`);

        bot.user.setPresence({
            activities: [{
                name: bot.config.bot.activity,
                type: ActivityType.Watching
            }]
        });

        bot.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
    }
}