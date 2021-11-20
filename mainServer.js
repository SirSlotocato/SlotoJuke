import Discord from 'discord.js';
import { MongoClient } from 'mongodb';



//const Discord = require('discord.js');
const debug = require('debug')('sj:main');


const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)
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
    CmdHandler.CheckPrefix(message, client);
  } catch (e) {
    console.error(e);
  }

});


async function dbConnect(dbUrl) {

  let client = await MongoClient.connect(dbUrl);

}