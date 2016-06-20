var express = require('express');
var router = express.Router();


// GET Test page
router.get('/test', function(req, res) {
	res.send('test')
	
});



module.exports = router;