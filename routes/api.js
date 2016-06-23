var express = require('express');
var router = express.Router();
var db = require("../models");

// just for debugging
var util = require('util');
var debug = true;


var structureFilters = function(filter, cb) {
	var newfilter = {
		'where': {},
		'include': [{
			model: db.MenuItem,
			through: {
				where: {}
			}
		}, {
			model: db.Customer,
			where: {}
		}]
	}

	console.log(filter)
	for (var key in filter) {
		switch(key) {
			case 'waiter':
			newfilter.where.UserId = filter[key]
			break;
			case 'table':
			newfilter.include[1].through.where = { 'status': filter[key] }
			break;
			case 'customer':
			newfilter.include[1].where = { 'haspayed': filter[key] }
			break;
			case 'orderStatus':
			newfilter.include[0].through.where = { 'status': filter[key] }
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



var getOrders = function(db, user, filter = {}, cb) {
	db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
		structureFilters(filter, function(newfilter) {
			if (debug) { console.log(util.inspect(newfilter, false, null)) };
			client.getOrders(newfilter).then(function(orders) {
				cb(null, orders)
			})
		})
	})
}

var getTables = function(db, user, filter = {}, cb) {
	db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
		client.getTables(filter).then(function(tables) {
			cb(null, tables)
		})
	})
}

var getCustomer = function(db, user, filter = {}, cb) {
	db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
		client.getCustomer(filter).then(function(customers) {
			cb(null, customers)
		})
	})
}

var getMenu = function(db, user, filter = {}, cb) {
	db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
		client.getMenuItems(filter).then(function(menu) {
			cb(null, menu)
		})
	})
}



/*

Search Filter definition
	
var filter = {
	// input filters
	waiter: UserId,
	table: number,
	customer: customerId, // haspayed
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
router.get('/orders/', function(req, res) {
	getOrders(req.db, req.user, '', function(err, data) {
		res.send(data)
	})
});

router.get('/orders/kitchen', function(req, res) {
	getOrders(req.db, req.user, '', function(err, data) {
		res.send(data)
	})
});

router.get('/menu/', function(req, res) {
	getMenu(req.db, req.user, '', function(err, data) {
		res.send(data)
	})
});

router.get('/menu/refresh', function(req, res) {
	// check for updates in the menu based on updatedAt
});

router.get('/tables/', function(req, res) {
	getTables(req.db, req.user, '', function(err, data) {
		res.send(data)
	})
});

// GET Test page
router.get('/tables/:id', function(req, res) {
	var filter = { where: {'number': req.params.id}}

	getTables(req.db, req.user, filter, function(err, data) {
		if (err) throw err;

		if (data[0].isfree == false) {
			var filter = { 
				where: {
					number: req.params.id
				}, 
				include: {
					model: db.Customer, 
					where: {haspayed: {$not: true} },
					include: {
						model: db.Order,
						attributes: ['id', 'comment', 'createdAt'],
						include: {
							model: db.MenuItem,
							attributes: ['id', 'name', 'price', 'isside', 'sideprice']
						}
					}
				} 
			}

			getTables(req.db, req.user, filter, function(err, data) {
				res.send(data)
			})
		} else {
			res.send(data)
		}
	})
});

// POST place orders for tables
router.post('/tables/:id', function(req, res) {
	// place order on table
	console.log('post received')

	var testuser = { ClientId: 1, id: 1}
	var exampleorder1 = {
		order: [{
			menuitemId: 8
		}, {
			menuitemId: 7
		}, {
			menuitemId: 1,
			sides: [{menuitemId: 3}, {menuitemId: 4}]
		}]
	}
	// waiter info = req.user

	var tableno = req.params.id
	var user = testuser

	var validateOrder = function(db, table, order, cb) {
	/*
		expected input:
			{
			order: [ {
					menuitemId,
					sides = [{menuitemId}]
				} ]
			if customer existing 
			customerid: customerid
			}

		validation:
			tableno must exist
			if (customer) table must be !isfree
			if (customer) customer must be !haspayed
			if (order[x].sides[x]) side item must be side
			if (order[x].sides[x]) main item must have sides (check amountofsides)
	*/
	console.log('start validateOrder')
		var validateOrderItems = function(client, orderitems, cb2) {
			console.log('start validateOrderItems')
			client.getMenuItems().then(function(menu) {
				var validated = 0
				for (i=0; i<orderitems.length; i++) {
					// loop through orderitems
					console.log('item ' + (i+1) + ' out of ' + orderitems.length)
					if (orderitems[i].sides) {
						console.log('item ' + (i+1) + ' has ' + orderitems[i].sides.length + ' sides')
						// if item has side(s)
						for (j=0; j<menu.length; j++) {
							if ((orderitems[i].menuitemId == menu[j].id) && (menu[j].amountofsides >= orderitems[i].sides.length)) {
								// is on menu and has appropriate amount of sides
								console.log('item with sides is ' + menu[j].name)
								// validate sides here!
								var validatedsides = 0
								for (k=0; k<orderitems[i].sides.length; k++) {
									for (l=0; l<menu.length; l++) {
										if ((orderitems[i].sides[k].menuitemId == menu[l].id) && (menu[l].isside == true) ) {
											console.log('found side ' + menu[l].name)
											validatedsides++
										}
									}
									if ((k+1 == orderitems[i].sides.length) && (validatedsides == orderitems[i].sides.length)) {
										// sides validated
										console.log('found ' + menu[j].name)
										validated++
									}
								}
							}
						}
					} else {
						// no sides
						for (j=0; j<menu.length; j++) {
							if (orderitems[i].menuitemId == menu[j].id) {
								// is on menu
								console.log('found ' + menu[j].name)
								validated++
							}
						}
					}
					
					if ((i+1 == orderitems.length) && (validated == orderitems.length)) {
						// success
						cb2(null, true)
					} else if ((i+1 == orderitems.length) && !(validated == orderitems.length)) {
						// no success
						cb2(null, false)
					} 
				}
			})
		}

		db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) { 
			client.getTables({where: {number: table} }).then(function(tables) {
				if (tables[0]) {
					// table exists
					if (tables[0].isfree) {
						// new customer
						console.log('new order, new customer')
						validateOrderItems(client, order.order, function(err, success) {
							if (success) {
								console.log('validation successful')
								cb(null, true)
							} else {
								console.log('validation not successful')
								cb(null, false)
							}

						})
					} else {
						// existing customer
						console.log('new order, existing customer')
						validateOrderItems(client, order.order, function(err, success) {
							if (success) {
								console.log('validation successful')
								cb(null, true)
							} else {
								console.log('validation not successful')
								cb(null, false)
							}

						})
					}
				} else {
					// table doesn't exist
					console.log('could not find table ' + table + ' for clientid ' + client.id)
					// cb with err
				}
			})
		})
	}
	
	var placeOrderExisting = function(db, user, order, cb) {
		// place order when customer exists
	}
	
	var placeOrderNew = function(db, user, order, cb) {
		// place order when new customer
		db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
			
			client.createCustomer({
				'UserId': user[0].id,
				'TableId': 2
			}).then(function(customer) {

			})
		})
	};

	validateOrder(req.db, tableno, exampleorder1)



});




module.exports = router;