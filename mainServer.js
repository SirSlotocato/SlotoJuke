
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.argv[2])
.catch((err) => {if(err) console.log('LOGIN ERROR. REASON: ' + err);});
import { CmdHandler } from './app/handlers/CmdHandler';

client.once('ready', () => {

  client.on('message', message => {
        if(message.author.bot){
          console.log('bot, no answer lel');
          return;
        }
        console.log('message received');

        // Voice only works in guilds, if the message does not come from a guild,
        // we ignore it
        if (!message.guild) {
            message.reply("I Can't join the channel because this is not a guild, sorry :/");
            return;
        }

        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voiceChannel) {
          CmdHandler.CheckPrefix(message, client);
        } else {
          //message.reply('You need to join a voice channel first!');
        }
      
  });
});