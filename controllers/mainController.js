const fs = require('fs');

const compcpp = require('./compile_cpp');
const compc = require('./compile_c');
const compjava = require('./compile_java');

var str;
var lang;
var output;

const index = (req, res) => {
    lang = 2;
    str='';
    output='default-output';
    res.render('home', {precode:str, outputcode:output, lang: lang -1});
}


const compile = (req, res) => {
    
    str = req.body.code;
    inp = req.body.input;
    lang = req.body.selector;
    
    if(lang==1)
    {
        fs.writeFile('./code.c',str,(err) => {

            if(err)
            throw(err);

            var status=compc.compile();

            if(!status) {
                output=compc.execute(inp);
            } else {
                output=status;
            }

            // console.log("Console output:");
            // console.log(output);

            res.render('home',{precode:str, outputcode:output, lang: lang-1});
            res.end();

        });
    }
    else if(lang==2)
    {
        fs.writeFile('./code.cpp',str,(err) => {

            if(err)
            throw(err);
            
            var status=compcpp.compile();

            if(!status) {
                output=compcpp.execute(inp);
            } else {
                output=status;
            }

            // console.log("Console output:");
            // console.log(output);

            res.render('home',{precode:str, outputcode:output, lang: lang-1});
            res.end();
        });
    }
    else if(lang==3)
    {
        fs.writeFile('./main.java',str,(err) => {

            if(err)
            throw(err);

            var status=compjava.compile();

            if(!status) {
                output=compjava.execute(inp);
            } else {
                output=status;
            }
            // console.log("Console output:");
            //console.log(output);

            res.render('home',{precode:str, outputcode:output, lang: lang-1});
            res.end();
        });
    }
    
    
    //console.log(output);
}


const login = (req, res) => {
    const alertMsg = "";
    res.render('login', {alertMsg: alertMsg});
}


const signup = (req, res) => {
    const alertMsg = "";
    res.render('signup', {alertMsg: alertMsg});
}


module.exports = {
    index, compile, login, signup
}