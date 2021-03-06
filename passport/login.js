var LocalStrategy = require('passport-local').Strategy;
var db = require("../models");
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
        	db.User.find({ where: {'username' :  username}}).then(
        		function(user) {
        			if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    console.log('found user')
                    return done(null, user);
                },
                function(err) {
                	return done(err);
                });

        })
    );


    var isValidPassword = function(user, password){
    	if (user.password == password) {
    		return true
    	} else {
    		return false
    	};
        //return bCrypt.compareSync(password, user.password);
    }
    
}