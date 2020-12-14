import queue from "../data/queue";
import ytdl from "ytdl-core";
import debugFactory from "debug";

const debug = debugFactory('sj:helper:music')

export default class MusicHelper {
  
  static async play(message, guild, song, nTry) {
    let serverQueue = queue.get(guild.id);
    if (!serverQueue)
      return;
    
    if (!song || song.length <= 0) {
      message.channel.send('```' + 'No more songs to play, leaving the channel' + '```');
      debug('no song');
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    
    for(let i = 0; i < song.length; i++){
      try {
        let dispatcher = await serverQueue.connection.play(await ytdl(song[i].link));
        await dispatcher
          .on('start', () => {
            debug('start dispatcher');
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            message.channel.send('```' + 'now playing: ' + song[i].title + '```');
          })
          .on('finish', () => {
            debug('music finished');
            skipToNextSong(message);
            i = song.length + 1;
          })
          .on('error', error => {
            if (nTry <= 10)
              MusicHelper.play(message, guild, song, nTry++)
            console.error(error);
          })
          .on('debug', info => {
            debug('debug info: ' + info);
          });
      } catch(e) {
        console.error(e);
      }
    }
    
  }
  
  static skip(message, serverQueue) {
    if (!message.member.voice.channelID) return message.channel.send('You have to be in a voice channel to stop the music!');
    if (!serverQueue) return message.channel.send('There is no song that I could skip!');
    skipToNextSong(message);
  }
  
  static stop(message, serverQueue) {
    if (!message.member.voice.channelID) return message.channel.send('You have to be in a voice channel to stop the music!');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  
}

function skipToNextSong(message) {
  let serverQueue = queue.get(message.guild.id);
  serverQueue.songs.shift();
  queue.set(serverQueue, message.guild.id);
  MusicHelper.play(message, message.guild, serverQueue.songs[0]);
}
