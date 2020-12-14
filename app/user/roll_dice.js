import DiceHelper from "../helpers/DiceHelper";

export default async function roll_dice(message, client){
  let reply = DiceHelper.rollDices(message.content);
  if(reply.search(/[(+]20[+)]|[^0-9a-zA-Z+(]20[^0-9a-zA-Z+(]/) != -1)
    message.channel.send("Holy Macaroly! ", {
      tts: false
    })
  if(reply.search(/[(+]1[+)]|[^0-9a-zA-Z+(]1[^0-9a-zA-Z+(]/) != -1)
    message.channel.send("eheh, you gay ", {
      tts: false //thats someway really dangerous, take it off for some time
    })
  message.reply('```' + reply + '```');
}