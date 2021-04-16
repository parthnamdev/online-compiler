require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const mainRouter = require('./routes/mainRouter');

//express app
const app = express();

//ejs view engines
app.set('view engine','ejs');

//middleware and static files
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));

// database
// const uri = `${"mongodb+srv://"+process.env.ATLAS_USER+":"+process.env.ATLAS_PASSWORD+"@"+process.env.ATLAS_CLUSTER+".fzmhp.mongodb.net/"+process.env.ATLAS_DB_NAME+"?retryWrites=true&w=majority"}`;
const uri = 'mongodb://localhost:27017/compilerDB';
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("database connected");
});

//webpage display and load
app.use('/',express.static(__dirname + '/public'));
// app.use(bodyparser.urlencoded({extended:true}));


// main router
app.use('/', mainRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    
    fs.readdir('./', (err, files) => {
        files.forEach(file => {

            let ext = path.extname(file).substr(1);
            if(ext == 'cpp' || ext == 'c' || ext == 'java' || ext == 'class' || ext == 'exe') {

                fs.unlink(file, (errr) => {
                    if(errr) {
                        console.log(errr);
                    }
                })
            }
        });
      })
    
    console.log("Server is running on PORT " + port +"...");
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});
app.post('*', (req, res) => {
    res.status(404).render('404');
});
// app.use((req, res) => {
//     res.status(404).render('404');
// });
