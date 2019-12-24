var queues = {};        
/*
queues is an array of object that contain: the queue(an array) and the actual playing index(of the array).
*/
export default function addSong(message, client){
    //throw 'Not Yet Implemented';
    let actualQueue;
    if(message){
        if(message.member.voiceChannel){
            if(queues[message.guild.id]){

            }   
            else{
                queues.id
            } 
        }
    }
    else{
        throw 'No msg';
    }
}