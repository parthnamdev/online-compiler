const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const compcpp = require('./compile_cpp');
const compc = require('./compile_c');
const compjava = require('./compile_java');
const User = require('../models/userModel');

var str;
var lang;
var output;
var files;

const index = async (req, res) => {
    lang = 2;
    str='';
    output='default-output';
    
    await User.findOne({username: req.user.username}, (err, found) => {
        if(!err && found) {

            files = found.files;

        }
    })
    res.render('home', {precode:str, outputcode:output, lang: lang -1, user: req.user.username, files: files, alertMsg: ''});
}


const compile = async (req, res) => {
    
    str = req.body.code;
    inp = req.body.input;
    lang = req.body.selector;

    await User.findOne({username: req.user.username}, (err, found) => {
        if(!err && found) {

            files = found.files;

            
        }
    })

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

            res.render('home',{precode:str, outputcode:output, lang: lang-1, user: req.user.username, files: files, alertMsg: ''});
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

            res.render('home',{precode:str, outputcode:output, lang: lang-1, user: req.user.username, files: files, alertMsg: ''});
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

            res.render('home',{precode:str, outputcode:output, lang: lang-1, user: req.user.username, files: files, alertMsg: ''});
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

const registerUser = (req, res) => {
    User.findOne({username: req.body.username}, (err, found) => {
        if(found) {
            res.render('signup',{alertMsg: "username already exist! please choose other username"});
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const newUser = {
                    uuid: uuidv4(),
                    username: req.body.username,
                    password: hash,
                    files: []
                }
                const cookieData = {
                    uuid: newUser.uuid,
                    username: newUser.username
                }
                User.create(newUser, (errr, person) => {
                    if(!errr) {
                        res.cookie("user", cookieData, { signed:true, maxAge: 60*60*1000});
                        res.redirect('/');
                    } else {
                        console.log(errr);
                        res.render('signup', {alertMsg: "error in registering. try after some time."});
                    }
                })
            })
            .catch((err) =>{
                console.log(err);
                res.render('signup', {alertMsg: "there was an error while encrypting password hence the operation was aborted. Your password safety is important for us."})
            })
        }
    })
}

const loginUser = (req, res) => {
    User.findOne({username: req.body.username}, (err, found) => {
        if(!err && found) {

            const cookieData = {
                uuid: found.uuid,
                username: found.username
            }

            bcrypt.compare(req.body.password, found.password).then((result) => {
                if(result) {
                    res.cookie("user", cookieData, { signed:true, maxAge: 60*60*1000});
                    res.redirect('/');
                } else {
                    res.render('login',{alertMsg: "invalid password. please check your password"});
                }
            }).catch((errr) => {
                res.render('login', {alertMsg: "there was an error while decrypting password hence the operation was aborted. Your password safety is important for us."})
            })
        } else {
            res.render('login',{alertMsg: "no user found."});
        }
    })
}

const logout = (req, res) => {

    req.user = null;
    res.clearCookie("user");
    res.redirect('/');
}

const deleteUser = (req, res) => {
    User.findOneAndDelete({uuid: req.user.uuid}, (err, docs) => {
        if(!err) {
            req.user = null;
            res.clearCookie("user");
            res.render('login', {alertMsg: "user deleted"});
        } else {
            res.render('login', {alertMsg: "error in deleting user"});
        }
    })
}

const deleteFile = (req, res) => {
    str = '';
    output = 'default-output';
    lang = parseInt(req.body.lang) + 1;
    let temp1;
    let temp2;
    User.findOne({username: req.user.username}, async (err, found) => {
        if(!err && found) {
            temp1 = found.files;
            found.files = found.files.filter(item => item.filename !== req.body.filename);
            temp2 = found.files;


            found.save((errr) => {
                if(!errr) {
                    res.render('home', {precode:str, outputcode:output, lang: lang-1, user: req.user.username, files: temp2, alertMsg: 'file removed'});
                } else {
                    res.render('home', {precode:str, outputcode:output, lang: lang-1, user: req.user.username, files: temp1, alertMsg: 'error removing file'});
                }
            })
            
        } else {
            res.redirect('/');
        }
    })
}

const addFile = (req, res) => {
    let temp1;
    let temp2;
    str = '';
    output = 'default-output';
    lang = parseInt(req.body.lang) + 1;

    User.findOne({username: req.user.username}, async (err, found) => {
        if(!err && found) {
            const fileTtoAdd = {
                filename: req.body.filename,
                code: req.body.code
            }
            temp1 = found.files;
            found.files.push(fileTtoAdd);

            temp2 = found.files;

            found.save((errr) => {
                if(!errr) {
                    res.render('home', {precode:str, outputcode:output, lang: lang-1, user: req.user.username, files: temp2, alertMsg: 'file added'});
                } else {
                    res.render('home', {precode:str, outputcode:output, lang: lang-1, user: req.user.username, files: temp1, alertMsg: 'error adding file'});
                }
            })
            
        } else {
            res.redirect('/');
        }
    })
}

module.exports = {
    index, compile, login, signup, registerUser, loginUser, logout, deleteUser, addFile, deleteFile
}