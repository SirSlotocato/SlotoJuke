
/**
 * A class containing all the cmds data.
 */
export class cmds{
    
    static GetExactUserCommand(toCheck){
        console.log('get exact user command');
        let cmds = this.GetUsers();
        let toRet;
        let ar = Object.keys(cmds).map(el => {
            let ar = cmds[el].map(cmd => {
                if(cmd == toCheck){
                    let toReturn = {
                        cmdType: el,
                        cmd: cmd
                    };
                    toRet = toReturn;
                    console.log('toReturn: ' + JSON.stringify(toReturn));
                    return toReturn;
                }
            });
        });
        console.log(toRet)
        return toRet;

    }

    static GetPrefixes(){
        console.log('get prefixes');
        return {
            normal_prefix: "?",
            admin_prefix: "/"
        };
    }

    static GetUsers(){
        console.log('get users');
        return {
            add_song: ['play', 'p'],
            remove_song: ['remove', 'r'],
            add_next: ['play-after', 'pf', 'p-f'],
            skip: ['skip', 's'],
            clear: ['clear', 'c'],
            pause: ['pause'],
            stop: ['stop'],
            join: ['join', 'j'],
            leave: ['leave', 'l'],
            play_song: ['playn', 'pn']
        };
    }

    static GetAdmin(){
        return {};
    }
}