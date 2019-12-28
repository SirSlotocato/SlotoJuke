import queue from "../data/queue";
import CmdHelper from "../helpers/CmdHelper";
import MusicHelper from "../helpers/MusicHelper";
import ytdl from "ytdl-core";

export default async function addSong(message, client){
    //throw 'Not Yet Implemented';
    if(message){
        if(message.member.voiceChannel){

            const args = message.content.split(' ');

            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                return message.channel.send('I need the permissions to join and speak in your voice channel!');
            }
            if(args[1] == undefined)
                return;
            const songInfo = await ytdl.getInfo(args[1]);
            const song = {
                title: songInfo.title,
                url: songInfo.video_url,
            };
        

            let serverQueue = queue.get(message.guild.id);
            if(!serverQueue){
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                };
        
                queue.set(message.guild.id, queueContruct);
        
                queueContruct.songs.push(song);

                try {
                    var connection = await voiceChannel.join();
                    queueContruct.connection = connection;
                    MusicHelper.play(message.guild, queueContruct.songs[0]);
                } catch (err) {
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(err);
                }
            }
            else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                return message.channel.send('```'+ song.title + ' added. song in queue: ' + serverQueue.songs.length + '```');
            }
        }
    }
    else{
        throw 'No msg';
    }
}