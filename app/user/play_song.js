import CmdHelper from "../helpers/CmdHelper";
import ytdl from "ytdl-core";
export default function addSong(message, client){
    const streamOptions = { seek: 0, volume: 1 };
    //throw 'Not Yet Implemented';
    if(message){
        if(message.member.voiceChannel){
            message.member.voiceChannel.join()
            .then(connection => {
                message.reply('Trying to play something');
                const stream = ytdl(CmdHelper.DeleteCmd(message.content), { filter : 'audioonly' });
                const dispatcher = connection.playStream(stream, streamOptions);
            })
            .catch(err => {
                throw err;
            });

        }
    }
    else{
        throw 'No msg';
    }
}