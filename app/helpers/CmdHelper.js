export default class CmdHandler{

    static DeleteCmd(content){
        let noPrefix = content.substr(1);
        let cmd = noPrefix.split(' ')[0];
        let cleaned = noPrefix.substr(cmd.length);
        cleaned = cleaned.trim();
        console.log('clean: ' + cleaned);
        return cleaned;
    }
}