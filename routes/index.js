var express = require('express');
var router = express.Router();

// just for debugging
var util = require('util');

var getOrders = function(db, user, filter = {}, cb) {
	db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {

		var structureFilters = function(filter, cb) {
			var newfilter = {
				'where': {},
				'include': [{
					model: db.MenuItem,
					where: {}
				}, {
					model: db.Customer
				}]
			}

			console.log(filter)
			for (var key in filter) {
				switch(key) {
					case 'waiter':
					newfilter.where.UserId = filter[key]
					break;
					case 'table':
					// table
					break;
					case 'customer':
					// table
					break;
					case 'orderStatus':
					newfilter.include[0].where = { 'OrderItems.status': filter[key] }
					break;
					case 'menuitemtype':
					// table
					break;
					case 'menuitemcategory':
					// table
					break;
					default:
					// not expected case
				}
			}

			cb(newfilter)
		}

		structureFilters(filter, function(newfilter) {
			console.log(util.inspect(newfilter, false, null));
			client.getOrders(newfilter).then(function(orders) {
				cb(null, orders)
			})
		})
		/*
		client.getOrders({
			include: [{
				model: db.MenuItem,
				through: {
					where: {'status': 'ordered'}
				}
			}, {
				model: db.Customer,
				include: [{
					model: db.User,
					attributes: ['username']
				}]
			}]
		})
		*/


		
	})
}
/*

Search Filter definition
	
var filter = {
	// input filters
	waiter: UserId,
	table: tableId,
	customer: customerId,
	orderStatus: orderItem.status,
	menuitem type
	menuitem category
	// output filters
	include
	fields: limit output fields
	sort
}


*/




// GET Test page
router.get('/test', function(req, res) {
	res.send('lol');
});



// GET Test page
router.get('/v1/orders/', function(req, res) {
	var testuser = { ClientId: 1, id: 1}

	var example = {
		waiter: 2
	}


	getOrders(req.db, testuser, example, function(err, data) {
		res.send(data)
	})
	
});



module.exports = router;