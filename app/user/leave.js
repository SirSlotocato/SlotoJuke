export default function leaveChannel(message, client){
    if(message){
        if(message.member.voiceChannel){
            message.reply('Trying to disconnect from ' + message.member.voiceChannel);
            message.member.voiceChannel.leave();
        }
    }
    else{
        throw 'No msg';
    }
}