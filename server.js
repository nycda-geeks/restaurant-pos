var express = require('express');
var app = express();

var bodyparser = require("body-parser");
var cookieparser = require('cookie-parser');
var path = require('path');

var db = require("./models");

db.sequelize.sync().then(function() {
	console.log('connected to db')
}, function(err) {
	if (err) throw err;
	console.log('could not connect to db')
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieparser());

// configure auth and session
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// initialize authentication and sessions
app.use(session({
	secret: 'secretsecret', 
	resave: false, 
	saveUninitialized: false
	// using redis for session storage here. if no redis server available, change 'store' to use another sessionstore.

}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

// init passport
var initPassport = require('./passport/init');
initPassport(passport);

// make stuff accessible to our router
app.use(function(req,res,next){
    //res.locals.session = req.session;
	req.db = db;
    next();
});

// check for authentication
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.send('you are not authenticated bro')
}

// static content and routes setup
var route_index = require('./routes/index')(passport);
var route_api = require('./routes/api');

app.use('/app', isAuthenticated, express.static('./angularApp/'));
app.use('/v1', isAuthenticated, route_api);
app.use('/', express.static('./public/'));
app.use('/', route_index);

// send angular page for * to enable html5mode (routing through angular)
app.get('/app/*', isAuthenticated, function(req, res) {
    res.sendfile('./angularApp/index.html');
  });
app.get('/*/', function(req, res) {
	console.log('hit get /*/')
    res.sendfile('./public/index.html');
  });


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Sorry, this website was not found');
	err.status = 404;
	next(err);
});

app.listen(3000, function () {
	console.log('App listening on port 3000!');
});

