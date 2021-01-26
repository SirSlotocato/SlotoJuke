import queue from "../data/queue";

export default function leaveChannel(message, client){
    if(message){
        if(message.member.voice.channelID){
            message.reply('Trying to disconnect from ' + message.member.voice.channel.name);
            message.member.voice.channel.leave();
            queue.delete(message.guild.id);

        }
    }
    else{
        throw 'No msg';
    }
}