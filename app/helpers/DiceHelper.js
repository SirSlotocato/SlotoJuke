import rndUnique from 'unique-random';
import async from 'async';
import debugFactory from "debug";

const debug = debugFactory('sj:helper:dice')
let stdDiceRnd = rndUnique(1, 20);

const regex = {
  WHITESPACE: /\s/,
  DICE: /[dD].[0-9]*/g,
  MOREDICES: /([0-9]+[dD].[0-9]*)/g,
  D: /[dD]/,
  DICETOTHROW: /([0-9]*[dD])/
}

export default class DiceHelper {
  static rollDices(toCheck){
    let noCmd = toCheck.substring(2);
    let noSpaceSplit = noCmd.split(regex.WHITESPACE);
    let noSpace = noSpaceSplit.join('');
    let multipleDices = noSpace.match(regex.MOREDICES);
    
    if (multipleDices) {
      async.forEachOf(multipleDices, (dice, key, callback) => {
        try {
          let _timeToThrow = dice.match(regex.DICETOTHROW);
          _timeToThrow = _timeToThrow[0].replace(regex.DICE, '');
          _timeToThrow = _timeToThrow.replace(regex.D, '');
        
          _timeToThrow = parseInt(_timeToThrow, 10);
          let _preparedDice = "";
          let _noTimeToThrow = dice.replace(_timeToThrow, '');
          _noTimeToThrow = parseInt(_noTimeToThrow.replace(regex.D, ''), 10);
          let _rndGenerator;
          if(_noTimeToThrow == 20)
            _rndGenerator = stdDiceRnd;
          else
            _rndGenerator = rndUnique(1, _noTimeToThrow);
          for(let i = 0; i < _timeToThrow; i++){
            _preparedDice += "+" + RndInt(0, 0, _rndGenerator);
          }
          let _support = noSpace.replace(dice, "(" + _preparedDice.substr(1) + ")");
          noSpace = _support;
        } catch (e) {
          callback(e);
        }
        callback();
      
      }, err => {
        if (err) throw err;
      });
    }
  
    let dices = noSpace.match(regex.DICE);
  
    if (!dices)
      return noSpace + '= ' + EVAL(noSpace);
  
    async.forEachOf(dices, (dice, key, callback) => {
      try {
        let _calculated = RndInt(1, parseInt(dice.replace(regex.D, ''), 10));
        let _support = noSpace.replace(dice, _calculated);
        noSpace = _support;
      } catch (e) {
        callback(e);
      }
      callback();
    
    }, err => {
      if (err) throw err;
    });
  
    return noSpace + ' = ' + EVAL(noSpace);
  
  }

}

function RndInt(min, max, rndGen) {
  if (!rndGen) {
    let rnd = rndUnique(min, max);
    return Math.floor(rnd());
  }
  else {
    return Math.floor(rndGen());
  }
}

function EVAL(toEval){
  if(!toEval)
    throw ('Nothing to eval :c');
  if(toEval.search(/[^0-9+*\-()]/) != -1)
    throw ('lol you cant send anything else ahah')
  return Math.floor(eval(toEval));
}
