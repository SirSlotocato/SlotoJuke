import { cmds } from "../data/cmds";
import join from "../user/join";
import leave from "../user/leave";
import add_song from "../user/add_song";
import skip from "../user/skip";
//import play_song from "../user/play_song";

let modules = {
    join: join,
    leave: leave,
    add_song: add_song,
    skip: skip
}

export class CmdHandler{

    static CheckPrefix(message, client){
        try {
            console.log('check prefixes');
            if(message.content[0] == cmds.GetPrefixes().normal_prefix){
                console.log('execute normal cmd');
                this.CheckUserCmd(message, client);
            }
            else if(message.content[0] == cmds.GetPrefixes().admin_prefix){
                console.log('execute admin cmd');
                this.CheckAdminCmd(message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static CheckUserCmd(message, client){
        let cmd = message.content;
        cmd = cmd.substr(1);
        
        let rightCmd = cmd.split(' ')[0];

        let cmdObj = cmds.GetExactUserCommand(rightCmd);
        for(var key in cmds.GetUsers()){
            if(key === cmdObj.cmdType){
                for(var mod in modules){
                    if(mod === cmdObj.cmdType){
                        modules[mod](message, client);
                    }
                }
            }
        }
    }

    static CheckAdminCmd(message){
        throw 'Not Yet Implemented';
    }
}