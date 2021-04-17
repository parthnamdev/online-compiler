const Readable = require('stream').Readable;
const { spawnSync } = require('child_process');

var compile = () => {

    const child = spawnSync('javac',['main.java']);
    return(child.stderr.toString());

}

var execute = (input) => {

    var s=new Readable();
    s.push(input);
    s.push(null);
    const cp2= spawnSync('java', ['main'], {input:input});
    return(cp2.stdout.toString());
    //console.log('function log:',cp2.stdout.toString());

}

module.exports = {
    compile, execute
};