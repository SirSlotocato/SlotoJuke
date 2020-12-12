import DiceHelper from "../helpers/DiceHelper";

export default async function roll_dice(message, client){
  let reply = DiceHelper.rollDices(message.content);
  if(reply.search(/[(+]20[+)]|[^0-9a-zA-Z+(]20/) != -1)
    reply = 'Holy Macaroly! ' + reply;
  if(reply.search(/[(+]1[+)]|[^0-9a-zA-Z+(]1/) != -1) {
    reply = 'eheh, you gay ' + reply;
    let dm = await message.author.createDM();
    dm.send('Un po\' potresti pure vergognarti però eh');
  }
  
  message.reply('```' + reply + '```');
}