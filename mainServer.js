const Discord = require('discord.js');
const debug = require('debug')('sj:main');

const client = new Discord.Client();
client.login(process.argv[2])
  .catch((err) => {
    if (err) console.error('LOGIN ERROR. REASON: ' + err);
  });
import {CmdHandler} from './app/handlers/CmdHandler';


client.once('ready', () => {
  debug('ready');
});

client.on('message', async message => {
  try {
    if (message.author.bot) {
      return;
    }
    debug('message received');

    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) {
      message.reply("I Can't join the channel because this is not a guild, sorry :/");
      return;
    }
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channelID) {
      CmdHandler.CheckPrefix(message, client);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  } catch (e) {
    console.error(e);
  }

});


