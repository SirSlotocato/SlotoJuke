import MusicHelper from "../helpers/MusicHelper";
import queue from "../data/queue";


export default function skip(message, client){
    MusicHelper.skip(message, queue.get(message.guild.id));
}