const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Router = require('./routes/router');
const User = require('./routes/user');
const Job = require('./routes/job');
const Seeker = require('./routes/seeker');
const skillTests = require('./routes/skillTests');
const notification = require('./routes/notification');
const interview = require('./routes/interview');
const reminder = require('./routes/reminder');
const general = require('./routes/general');

const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('dotenv').config()

//DB connection

mongoose.connect('mongodb://127.0.0.1:27017/jobBoard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.connect('mongodb+srv://admin:S7M8G9.123@cluster0.xflmf.mongodb.net/jobBoard?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

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
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + '/uploads'));

// system routes
app.use('/', Router);
app.use('/user', User);
app.use('/job', Job);
app.use('/candidate', Seeker);
app.use('/test', skillTests);
app.use('/notification', notification);
app.use('/interview', interview);
app.use('/reminder', reminder);
app.use('/general', general);

const port = 5000;

app.listen(port, () => "Smart Job Board server running on port " + port);