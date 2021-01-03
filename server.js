const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./routes/router');
const User = require('./routes/user');
const Job = require('./routes/job');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');



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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cross origin request support
app.use(cors({
    origin : "http://localhost:3000", // for the React app in client side
    credentials: true
}))

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

// cookie-parser
app.use(cookieParser("secret"));  

// passport auth
app.use(passport.initialize());
app.use(passport.session()); 

// passport config
require('./configs/passport')(passport);

app.use(flash());

// system routes
app.use('/', Router);
app.use('/user', User);
app.use('/job', Job);

const port = 5000;

app.listen(port, () => "Smart Job Board server running on port " + port);