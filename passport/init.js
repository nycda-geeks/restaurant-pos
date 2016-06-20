var login = require('./login');
var signup = require('./signup');
var db = require("../models");

module.exports = function(passport){
    // Serialize sessions
    passport.serializeUser(function(user, done) {
    	done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
    	db.User.find({where: {id: id}}).then(
    		function(user){ done(null, user) },
    		function(err){ done(err, null) }
    	);
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}