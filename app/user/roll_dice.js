import DiceHelper from "../helpers/DiceHelper";

export default async function roll_dice(message, client){
  let reply = DiceHelper.rollDices(message.content);
  if(reply.search(/[(+]20[+)]|[^0-9a-zA-Z+(]20/) != -1)
    message.channel.send("Holy Macaroly! ", {
      tts: true
    })
  if(reply.search(/[(+]1[+)]|[^0-9a-zA-Z+(]1/) != -1)
    message.channel.send("eheh, you gay ", {
      tts: true
    })
  message.reply('```' + reply + '```');
}