const Readable=require('stream').Readable;

const { spawnSync}=require('child_process');

var compile=function(){

    const child = spawnSync('javac',['main.java']);
    return(child.stderr.toString());
}

var execute=function(inp){
    var s=new Readable();
    s.push(inp);
    s.push(null);
    const cp2= spawnSync('java',['main'],{input:inp});
    return(cp2.stdout.toString());
    //console.log('function log:',cp2.stdout.toString());

}
module.exports={compile,execute};