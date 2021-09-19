import queue from "../data/queue";


export default function loop(message, client){
    let serverQueue = queue.get(message.guild.id);
    serverQueue.loop = !serverQueue.loop;
    queue.set(serverQueue, message.guild.id);
    message.channel.send('Loop ' + (serverQueue.loop ? 'enabled' : 'disabled'));
}