var LocalStrategy = require('passport-local').Strategy;
var db = require("../models");
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
        	console.log('signup triggered')
        	findOrCreateUser = function(){
        		// NEW
        		db.Client.find({ where: {'name': req.body.restaurantname }}).then(function(client) {
        			if (client) {
        				console.log('Client already exists: ' + client.name + ' , ClientID: ' + client.id)
        				return done(null, false);
        			} else {
        				console.log('client does not exist, must create')
        				var newclient = {
        					'name': req.body.restaurant
        				}
        				newclient.friendlyname = req.body.restaurant.toString().toLowerCase().replace(/ /g, '');

        				if (req.body.description) {
        					newclient.description = req.body.description
        				}
        				console.log(newclient)
        				
        				db.Client.create(newclient).then(function(client) {
        					console.log('Client Registration successful: ' + client.friendlyname);    
        					client.createUser({
        						'username': username,
        						'password': createHash(password),
        						'email': req.body.email
        					}).then(function(user) {
                        		console.log('User Registration successful: ' + user.username);    
                        		return done(null, user);
                        	});
        				})
        			}
        		})
				
				/*
        		db.User.find({ where: {'username' :  username }}).then(function(user) {
                    // already exists
                    if (user) {
                    	console.log('User already exists with username: '+username);
                    	return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        console.log('cant find user, must create')

                        // save the user
                        db.User.create({
                        	'username': username,
                        	'password': createHash(password),
                        	'email': req.param('email')
                        }).then(function(user) {
                        	console.log('User Registration successful: ' + user.username);    
                        	return done(null, user);
                        });
                    }
                });
                */
        	};

        	findOrCreateUser();
        })
	);
    // Generates hash using bCrypt
    var createHash = function(password){
    	return password;
    	//return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}