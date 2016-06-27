var express = require('express');
var session = require('express-session')
var request = require('request')
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

//https://api01.highside.net/start/BJjOMoaH

	// POST Register User
	router.post('/register', passport.authenticate('signup'), function(req, res) {
		// if successful
		var user = req.user
		// request SMS for verify site
		var url = 'https://'+process.env.SMS_USER+':'+process.env.SMS_PASSWORD+'@api01.highside.net/start/BJjOMoaH?number='+user.number+'&userid='+user.id
		console.log(url)
		request.get(url, function (err, response, body) {
			if (response.statusCode == 200) {
					var pin = JSON.parse(body)
					var pin = parseInt(pin)
					user.updateAttributes({
						pin: pin
					})
					.then(function() {
						res.redirect('/register/verify/' + user.id);
						req.logout();
					})
					
			} else {
				console.log('error at request')
				console.log(err)
			}
		})
		
	});

	// POST Verify
	router.post('/register/verify/:userid', function (req, res) {
		var data = req.body
		var userid = parseInt(req.params.userid)
		if ('pin' in data) {
			req.db.User.findOne({ where: {id: userid} }).then(function(err, user) {
				console.log(user)
				if (user) {
					console.log(user)
					if (user.pin == data.pin) {
						// verified
						user.updateAttributes({
							verified: true
						}).then(function () {
							console.log('activated')
							res.redirect('/login');
						})
					}
				}
			})
			console.log(data)
		}
	});

	// GET Logout page
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	router.get('/auth', isAuthenticated, function(req, res) {
		res.send('authenticated user: ' + req.user.username + ', restaurant id: ' + req.user.ClientId)
	});

	router.get('/auth2', authenticate, function(req, res) {
		res.send(req.user)
	});

	return router;
};