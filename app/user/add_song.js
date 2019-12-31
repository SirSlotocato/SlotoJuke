import queue from "../data/queue";
import CmdHelper from "../helpers/CmdHelper";
import MusicHelper from "../helpers/MusicHelper";
import ytdl from "ytdl-core";
import { YoutubeDataAPI } from "youtube-v3-api";
import UrlHelper from "../helpers/UrlHelper";
import ytapi from "youtube-search";
const ytAPIKEY = process.argv[3];

export default async function addSong(message, client) {
    if (message) {
        if (message.member.voiceChannel) {
            
            const args = message.content.split(' ');
            
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                return message.channel.send('I need the permissions to join and speak in your voice channel!');
            }
            if (args[1] == undefined)
            return;
            
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };
            new Promise((resolve) => {
                resolve();
            })
                .then(() => {
                    return UrlHelper.isUrl(args[1]);
                })
                .then(isUrl => {
                    if (isUrl) {
                        ytdl.getInfo(args[1])
                            .then(songInfo => {
                                return {
                                    title: songInfo.title,
                                    url: songInfo.video_url,
                                };

                            });
                    } else {
                        return ytapi(CmdHelper.DeleteCmd(message.content), { maxResults: 1, key: ytAPIKEY, videoCategoryId: 10, type: 'video'})
                            .then(results => {
                                return {
                                    title: results.results[0].title,
                                    url: results.results[0].link
                                };
                            })

                    }
                })
                .then(song => {

                    let serverQueue = queue.get(message.guild.id);
                    if (!serverQueue) {

                        queue.set(message.guild.id, queueContruct);
                        
                        queueContruct.songs.push(song);
                        message.channel.send('```' + song.title + ' added. song in queue: ' + queueContruct.songs.length + '```');
                        console.log("imma here");
                        return voiceChannel.join();
                    }
                    else {
                        serverQueue.songs.push(song);
                        console.log(serverQueue.songs);
                        message.channel.send('```' + song.title + ' added. song in queue: ' + queueContruct.songs.length + '```');
                        return 'stop';
                    }
                })
                .then((connection) => {
                    if (connection == 'stop')
                        return connection;

                    //let serverQueue = queue.get(message.guild.id);
                    queueContruct.connection = connection;
                    MusicHelper.play(message, message.guild, queueContruct.songs[0]);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
    else {
        throw 'No msg';
    }
}