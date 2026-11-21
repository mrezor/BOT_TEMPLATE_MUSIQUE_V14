const fs = require('fs');

let eventCount = 0;

module.exports = async (bot) => {
  eventCount = 0;

  const eventFiles = fs.readdirSync('./src/events/').filter(f => f.endsWith('.js'));
  for (const file of eventFiles) {
    const event = require(`../../events/${file}`);
    console.log('\x1b[32m' + 'L\'event ' + '\x1b[35m' + `${file.split('.')[0]}` + '\x1b[32m' + ' est chargée avec succés !');
    bot.on(event.name, (...args) => event.execute(...args, bot));
    eventCount++;
  }

  const eventSubFolders = fs.readdirSync('./src/events/').filter(f => !f.endsWith('.js'));
  eventSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./src/events/${folder}/`).filter(f => f.endsWith('.js'));

    for (const file of commandFiles) {
      const event = require(`../../events/${folder}/${file}`);
      console.log('\x1b[32m' + `L'event ` + '\x1b[35m' + `${file.split('.')[0]}` + '\x1b[32m' + ' est chargée avec succés depuis ' + '\x1b[35m' + `${folder}`);
      bot.on(event.name, (...args) => event.execute(...args, bot));
      eventCount++;
    };
  });
}

module.exports.getEventCount = () => eventCount;