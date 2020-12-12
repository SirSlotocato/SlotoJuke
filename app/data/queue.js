import debugFactory from "debug";

const debug = debugFactory('sj:data:queue');

const queues = {};

/*const queueModel = {
  textChannel: message.channel,
  voiceChannel: voiceChannel,
  connection: null,
  songs: [],
  volume: 5,
  playing: true,
};*/

export default class queue {

  static set(queue, id){
    if(!queue) debug('no queue passed')
    queues[id] = queue;
    return queue;
  }

  static get(id){
    return queues[id];
  }

  static addSongToQueue(song, qId){
    let queueToChange = queue.get(qId);
    let projectedSong = {title: song.title, link: song.link};
    queueToChange.songs.push(projectedSong);
    return queue.set(queueToChange, qId);
  }
  
  static delete(qId){
    delete queues[qId];
  }

}
