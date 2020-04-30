const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');


const app = express();

//Body Parser Middleware
app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoUri;

//connecto to mongo db
mongoose.connect(db)
.then(() => console.log('Mongo connected..'))
.catch( err => console.log('Error Connecting to database...')); 

//Use Routes

app.use('/api/items', items);

if(process.env.NODE_ENV === 'production'){

    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port , () => console.log('Server started on port ' + port));