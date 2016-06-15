var express = require('express');
var app = express();
var bodyparser = require("body-parser");
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



// make stuff accessible to our router
app.use(function(req,res,next){
	req.db = db;
    next();
});

// static content and routes setup
var routes = require('./routes/index');
app.use('/', express.static('./public/'));
app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Sorry, this website was not found');
	err.status = 404;
	next(err);
});

app.listen(3000, function () {
	console.log('App listening on port 3000!');
});
