var express = require('express');
var router = express.Router();

module.exports = function(passport){

	router.use('/', express.static('../test/'));

	// GET Test page
	router.get('/test', function(req, res) {
		res.send('test')
		
	});


	return router;

}