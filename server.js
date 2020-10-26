const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./routes/router');
const passport = require('passport');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/jobBoard', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Mongodb connection error:'));
// db.once('open', () => {
//     console.log('Mongodb connection successful for jobBoard ');
// });


app.use(bodyParser.json());
 // app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', Router);
app.use(passport.initialize());
app.use(passport.session());


const port = 5000;

app.listen(port, () => "Smart Job Board server running on port " + port);