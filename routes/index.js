var express = require('express');
var session = require('express-session')
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = function(passport){

	// POST Login page
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : false  
	}));

	// POST Register User
	router.post('/register', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/register',
		failureFlash : false
	}));

	// GET Test page
	router.get('/testmail', function(req, res) {
		console.log('send email')
		var email = require('../mail/index')('mail@dominik-bauer.de', 'test');
		res.send('hello world')

	});

	router.get('/auth', isAuthenticated, function(req, res) {
		res.send('authenticated user: ' + req.user.username)
	});
	return router;
};