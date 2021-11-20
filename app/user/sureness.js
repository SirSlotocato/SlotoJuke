import DiceHelper from "../helpers/DiceHelper"

const sureness_level = [
    'lol you no',
    'it\'s a magical probably not',
    'it\'s not mario',
    'it\'s not exactly mario',
    'it\'s better than mario',
    'it\'s almost pietro',
    'it\'s pietro',
    'lol you yes',
] 

export default async function sureness(message, client){
    let rand = DiceHelper.RndInt(0, 7);
    message.reply('```' + sureness[rand] + '```');
}
