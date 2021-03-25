const express = require('express')
const fs = require('fs');


const mainRouter = require('./routes/mainRouter');
// const bodyparser=require('body-parser');
//var input='';
//var status='';


//express app
const app = express();

//ejs view engines
app.set('view engine','ejs');

//middleware and static files
app.use(express.urlencoded({extended: true}));

//webpage display and load
app.use('/',express.static(__dirname + '/public'));
// app.use(bodyparser.urlencoded({extended:true}));


// main router
app.use('/', mainRouter);


// app.get('/',(req,res)=>{
//    res.redirect('/webpages');
// });
// app.get('/webpages',(req,res)=>{
//     //console.log(str,output);
//     var str='';
// var output='default-output';
//     res.render('webpages',{precode:str, outputcode:output});
// })
// app.get('/nextpage',(req,res)=>{
//     res.render('nextpage') ;
// });
// var inp;
// app.post('/',(req,res)=>{
//     var str= req.body.code;
//     inp=req.body.input;
//     lang=req.body.selector;
    
//     if(lang==1)
//     {
//         fs.writeFile('./code.c',str,(err)=>{
//             if(err)
//             throw(err);
//             var status=compc.compile();
//             if(!status)
//             output=compc.execute(inp);
//             else
//             output=status;
//             console.log("Console output:");
//             console.log(output);
//             res.render('webpages',{precode:str, outputcode:output});
//         res.end();
//         });
//     }
//     else if(lang==2)
//     {
//         fs.writeFile('./code.cpp',str,(err)=>{
//             if(err)
//             throw(err);
//             var status=compcpp.compile();
//             if(!status)
//             output=compcpp.execute(inp);
//             else
//             output=status;
//             console.log("Console output:");
//             console.log(output);
//             res.render('webpages',{precode:str, outputcode:output});
//         res.end();
//         });
//     }
//     else if(lang==3)
//     {
//         fs.writeFile('./main.java',str,(err)=>{
//             if(err)
//             throw(err);
//             var status=compjava.compile();
//             if(!status)
//             output=compjava.execute(inp);
//             else
//             output=status;
//             //console.log("Console output:");
//             //console.log(output);
//             res.render('webpages',{precode:str, outputcode:output});
//         res.end();
//         });
//     }
    
    
//     //console.log(output);
    
// });

const port = process.env.PORT || 3000;
app.get('*', (req, res) => {
    res.status(404).render('404');
});
app.post('*', (req, res) => {
    res.status(404).render('404');
});
app.listen(port, () => {
    console.log("Server is running on PORT " + port +"...")
});

// app.use((req, res) => {
//     res.status(404).render('404');
// });
