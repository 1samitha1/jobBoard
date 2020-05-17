const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const Router = require('./routes/router');

app.use(bodyParser.json());
 // app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', Router);


const port = 5000;

app.listen(port, () => "Server running on port " + port);