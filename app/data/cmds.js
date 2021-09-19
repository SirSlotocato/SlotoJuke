import debugFactory from "debug";

const debug = debugFactory('sj:data:cmd');

const userCmds = {
    add_song: ['play', 'p', 'PORCODIOCOMECAZZOTIPERMETTIANONMETTERESTACANZONE'],
    remove_song: ['remove'],
    add_next: ['play-after', 'pf', 'p-f'],
    skip: ['skip', 's'],
    clear: ['clear', 'c'],
    pause: ['pause'],
    stop: ['stop'],
    join: ['join', 'j'],
    leave: ['leave'],
    play_song: ['playn', 'pn'],
    roll_dice: ['r'],
    loop: ['l', 'loop']
};

/**
 * A class containing all the cmds data.
 */
export class cmds{
    
    static GetExactUserCommand(toCheck){
        debug('get exact user command');
        let cmdList = cmds.GetUsers();
        let toRet;
        Object.keys(cmdList).forEach(el => {
            cmdList[el].forEach(cmd => {
                if(cmd == toCheck){
                    let toReturn = {
                        cmdType: el,
                        cmd: cmd
                    };
                    toRet = toReturn;
                    return toReturn;
                }
            });
        });
        return toRet;

    }

    static GetPrefixes(){
        debug('get prefixes');
        return {
            normal_prefix: "!",
            admin_prefix: "?"
        };
    }

    static GetUsers(){
        debug('get users');
        return userCmds;
    }

    static GetAdmin(){
        return {};
    }
}
