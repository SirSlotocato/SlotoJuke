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
        const dispatcher = serverQueue.connection.play(ytdl(song.url));
        dispatcher
        .on('start', () => {
            console.log('dispatcher is speaking? dunno');
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            message.channel.send('```' + 'now playing: ' + song.title + '```');        
        })
        .on('end', reason => {
            console.log('Music ended! reason: ' + reason);
            serverQueue.songs.shift();
            this.play(message, guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.error(error);
        })
        .on('speaking', speaking => {
            console.log('dispatcher is speaking? ' + speaking);
        })
        .on('debug', info => {
            console.log('debug info: ' + info);
        });
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