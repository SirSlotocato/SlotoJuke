import queue from "../data/queue";
import CmdHelper from "../helpers/CmdHelper";
import MusicHelper from "../helpers/MusicHelper";
import ytdl from "ytdl-core";
import {YoutubeDataAPI} from "youtube-v3-api";
import UrlHelper from "../helpers/UrlHelper";
import ytapi from "youtube-search";
import debugFactory from "debug";

const debug = debugFactory('sj:user:add_song');
const ytAPIKEY = process.argv[3];

export default async function addSong(message, client) {
  if (message) {
    if (message.member.voice.channelID) {
      try{
        
          const args = message.content.split(' ');
          //if()
    //      const voiceChannel = message.member.voiceChannel;
          const voiceChannel = await client.channels.fetch(message.member.voice.channelID);
          if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
          const permissions = voiceChannel.permissionsFor(message.client.user);
          if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('I need the permissions to join and speak in your voice channel!');
          }
          if (args[1] == undefined)
            return;
    
          let queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
          };
      
          let song;
          if (UrlHelper.isUrl(args[1])) {
            song = (await ytdl.getInfo(args[1])).videoDetails;
            song.link = song.video_url;
          } else {
            let songs = await ytapi(CmdHelper.DeleteCmd(message.content), {
              maxResults: 5,
              key: ytAPIKEY,
              videoCategoryId: 10,
              type: 'video'
            });
            song = songs.results;
          }
      
          let serverQueue = queue.get(message.guild.id);
          let connection;
          if (!serverQueue) {
            queueContruct.songs.push(song);
            message.channel.send('```' + song[0].title + ' added. song in queue: ' + queueContruct.songs.length + '```');
            connection = await voiceChannel.join();
          } else {
            queueContruct = queue.addSongToQueue(song, message.guild.id);
            message.channel.send('```' + song[0].title + ' added. song in queue: ' + queueContruct.songs.length + '```');
            return 'stop';
          }
          
          
        queueContruct.connection = connection;
        queue.set(queueContruct, message.guild.id);
  
        await MusicHelper.play(message, message.guild, queueContruct.songs[0]);
        } catch (e) {
          console.error(e);
        }
      }
  } else {
    message.reply('Join a voice channel first');
    throw 'No msg';
  }
}