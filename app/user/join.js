export default function joinChannel(message, client){
    console.log('join received');
    if(message){
        if(message.member.voiceChannel){
            message.reply('Trying to connect to ' + message.member.voiceChannel)
            message.member.voiceChannel.join()
                .then(connection => {
                    message.reply('Connected to ' + message.member.voiceChannel)
                    return connection;
                })
                .catch(err => {
                    console.error('error while join ' + err);
                    message.reply('Unable to connect to the voice channel');
                })
        }
    }
    else{
        throw 'No msg';
    }
}