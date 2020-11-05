const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./routes/router');
const User = require('./routes/user');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

// cross origin request support
app.use(cors())

// passport config
require('./configs/passport')(passport);

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/jobBoard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error:'));
db.once('open', () => {
    console.log('Mongodb connection successful for jobBoard ');
});

// Support for JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

// passport auth
app.use(passport.initialize());
app.use(passport.session()); 

// system routes
app.use('/', Router);
app.use('/user', User);





const port = 5000;

app.listen(port, () => "Smart Job Board server running on port " + port);