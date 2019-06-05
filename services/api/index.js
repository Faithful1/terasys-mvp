config = require('./config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const passport = require('passport');
const http = require('http');

const app = express();
const router = express.Router();

mongoose.Promise = global.Promise;

mongoose.connect(config.mongodb.host, {
    useNewUrlParser: true
}).catch(console.error);

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));

app.use(flash());

//Initialize passport for jwt login
app.use(passport.initialize());
app.use(passport.session());
require("./auth/control.jwt")(passport);

app.use(router);

require('./prototypes');
require('./routes/route.main')(router);

const server = http.createServer(app);

const io = require('socket.io')(server);

require('./sockets/socket.main')(io);

app.get('/', (req, res) => res.send('API works'));

app.listen(config.port).on('listening', function () {
    console.log('@terasysltd/terrasy-mvp-api ' + config.env, 'is live at port ' + config.port)
});

//Set up sessions in express
/*
 var session = require('express-session');
 var sessionMiddleware = session({
 secret: config.secret,
 resave: false,
 saveUninitialized: true
 });
 app.use(sessionMiddleware);
 */

//Initialize passport for local login
/*
 var passport = require('passport');
 app.use(passport.initialize());
 app.use(passport.session());
 require('./auth/control.local.js')(passport);
 */