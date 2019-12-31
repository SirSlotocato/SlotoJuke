import queue from "../data/queue";
import ytdl from "ytdl-core";

export default class MusicHelper{

    static play(message, guild, song) {
        const serverQueue = queue.get(guild.id);
        if(!serverQueue)
        return;
        
        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url));
        dispatcher
        .on('start', speaking => {
            console.log('dispatcher is speaking? dunno');
        })
        .on('end', reason => {
            console.log('Music ended! reason: ' + reason);
            serverQueue.songs.shift();
            this.play(message, guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.error(error);
        })
        .on('speaking', diocane => {
            console.log('dispatcher is diocane? ' + diocane);
        })
        .on('debug', info => {
            console.log('debug info: ' + info);
        });
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        message.channel.send('```' + 'now playing: ' + song.title + '```');
        dispatcher.resume();
        
    }

    static skip(message, serverQueue) {
        if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
        if (!serverQueue) return message.channel.send('There is no song that I could skip!');
        serverQueue.connection.dispatcher.end();
    }
    
    static stop(message, serverQueue) {
        if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }


}