import queue from "../data/queue";
import CmdHelper from "../helpers/CmdHelper";
import MusicHelper from "../helpers/MusicHelper";
import ytdl from "ytdl-core";
import ytpl from "ytpl";
import ytsr from "ytsr";
import UrlHelper from "../helpers/UrlHelper";
import debugFactory from "debug";
import * as yt from 'youtube-search-without-api-key'
import YouTube from "discord-youtube-api";
import fetch from 'node-fetch';


const debug = debugFactory('sj:user:add_song');
const ytAPIKEY = process.env.YTAPIKEY;

const youtube = new YouTube(ytAPIKEY);

export default async function addSong(message, client) {
  if (message) {
    if (message.member.voice.channelID) {
      try {

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

        let songToPush = [];
        if (UrlHelper.isUrl(args[1])) {
          if (args[1].includes('?list=')) {
            let listId = args[1].split('?list=')[1];

            let result = await ytpl(listId);
            result.items.forEach(el => {
              let s = el;
              s.link = s.url;
              songToPush.push(s);
            })


          } else {
            let resSong = (await ytdl.getInfo(args[1])).videoDetails;
            let song = { link: resSong.video_url, title: resSong.title };
            song.link = resSong.video_url;
            songToPush.push(song);
          }
        } else {
          let searchResult = await fetch(constructUrl(CmdHelper.DeleteCmd(message.content).trim()))
          let songs = await searchResult.json();

          
          if (!songs || songs.length == 0) {
            message.channel.send('```' + 'no song found. Try with something else!' + '```')
            return ('stop')
          }
          let song = songs.items[0];

          song.link = 'https://www.youtube.com/watch?v=' + song.id.videoId;
          song.title = song.snippet.title;

          songToPush.push(song);

        }
        
        let serverQueue = queue.get(message.guild.id);
        let connection;
        if (!serverQueue) {
          debug('creating new queue for ' + message.guild.id)
          queueContruct.songs.push(...songToPush);
          if (songToPush.length == 1)
            message.channel.send('```' + songToPush[0].title + ' added. song in queue: ' + queueContruct.songs.length + '```');
          else
            message.channel.send('```' + songToPush.length + ' songs added. song in queue: ' + queueContruct.songs.length + '```');

          connection = await voiceChannel.join();
        } else {
          debug('found queue for ' + message.guild.id + ' queue data: ' + serverQueue);
          queueContruct = serverQueue;
          queueContruct.songs.push(...songToPush);
          if (songToPush.length == 1)
            message.channel.send('```' + songToPush[0].title + ' added. song in queue: ' + queueContruct.songs.length + '```');
          else
            message.channel.send('```' + songToPush.length + ' songs added. song in queue: ' + queueContruct.songs.length + '```');
          return 'stop';
        }


        queueContruct.connection = connection;
        queue.set(queueContruct, message.guild.id);

        await MusicHelper.play(message, message.guild, queueContruct.songs[0]);
      } catch (e) {
        debug(e);
        console.error(e);
      }
    }
  } else {
    message.reply('Join a voice channel first');
    throw 'No msg';
  }
}

function constructUrl(query, region = 'de') {
  debug('query: ' + `https://youtube.googleapis.com/youtube/v3/search?key=${ytAPIKEY}&type=video&part=snippet&q=${query}&regionCode=${region}&videoCategoryId=10&safeSearch=none&videoType=any&order=relevance`)
  return `https://youtube.googleapis.com/youtube/v3/search?key=${ytAPIKEY}&type=video&part=snippet&q=${query}&regionCode=${region}&videoCategoryId=10&safeSearch=none&videoType=any&order=relevance`;
}