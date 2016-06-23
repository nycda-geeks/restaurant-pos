var express = require('express');
var session = require('express-session')
var router = express.Router();

// token authentication
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var authenticate = expressJwt({secret : 'secretsecret'});

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.send('you are not authenticated');
}

var generateToken = function (req, res, next) {  
	req.token = jwt.sign({
		id: req.user.id,
	}, 'secretsecret', {
		expiresIn: 60
	});
	next();
}

var verifyToken = function(req, res, next) {

}

module.exports = function(passport){

	// POST Login page
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : false  
	}));

	// POST Login page
	router.post('/loginnew', 
		passport.authenticate('login', { session: false }), 
		generateToken, 
		function(req, res) {
			res.status(200).json({
				user: req.user,
				token: req.token
			});
		} 
	);

	// POST Register User
	router.post('/register', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/register',
		failureFlash : false
	}));

	// GET Logout page
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// GET Test page
	router.get('/testmail', function(req, res) {
		console.log('send email')
		var email = require('../mail/index')('mail@dominik-bauer.de', 'test');
		res.send('hello world')

	});

	router.get('/auth', isAuthenticated, function(req, res) {
		res.send('authenticated user: ' + req.user.username + ', restaurant id: ' + req.user.ClientId)
	});

	router.get('/auth2', authenticate, function(req, res) {
		res.send(req.user)
	});

	return router;
};