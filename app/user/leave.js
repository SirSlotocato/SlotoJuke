import queue from "../data/queue";

export default function leaveChannel(message, client){
    if(message){
        if(message.member.voiceChannel){
            message.reply('Trying to disconnect from ' + message.member.voiceChannel);
            message.member.voiceChannel.leave();
            queue.delete(message.guild.id);

        }
    }
    else{
        throw 'No msg';
    }
}