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

var getUsers = function(db, user, filter = {}, cb) {
	db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
		client.getUsers(filter).then(function(users) {
			cb(null, users)
		})
	})
}

var getRoles = function(db, user, filter = {}, cb) {
	db.Role.findAll().then(function(roles) {
		cb(null, roles)
	})
}

var getClient = function(db, user, cb) {
	db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
		cb(null, client)
	})
}

var checkManager = function(user, cb) {
	if (user.RoleId == 1) {
		// manager
		cb(null, true)
	} else {
		// not manager
		cb(null, false)
	}
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

// GET Users page
router.get('/users/', function(req, res) {
	getUsers(req.db, req.user, { 'include': {
		model: db.Role,
		attributes: ['name']
	}}, function(err, data) {
		res.send(data)
	})
});

// PUT User update
router.put('/users/:id', function(req, res) {
	console.log(req.body)
	getUsers(req.db, req.user, {'where': {'id': req.params.id}}, function(err, users) {
		if (users[0]) {
			users[0].updateAttributes(req.body)
			.then(function (err, data) { 
				if (err) throw err;
				if (data) {res.sendStatus(200); console.log('successfully updated')}
			})
		}
	})
});

// DELETE User
router.delete('/users/:id', function(req, res) {
	req.db.User.destroy({
		where: {
			id: req.params.id
		}
	}).then(function () {
		console.log('user ' + req.params.id + 'successfully deleted')
		res.sendStatus(200)
	})
});

// DELETE Menuitem
router.delete('/menu/:id', function(req, res) {
	checkManager(req.user, function(err, isManager) {
		if (isManager) {
			req.db.MenuItem.destroy({
				where: {
					id: req.params.id,
					ClientId: req.user.ClientId
				}
			}).then(function () {
				console.log('menuitem ' + req.params.id + 'successfully deleted')
				res.sendStatus(200)
			})
		} else {
			console.log('not a manager')
		}
	})
});

// GET Users page
router.get('/users/:id', function(req, res) {
	getUsers(req.db, req.user, {'where': {'id': req.params.id}}, function(err, data) {
		res.send(data[0])
	})
});

router.get('/roles/', function(req, res) {
	getRoles(req.db, req.user, '', function(err, data) {
		res.send(data)
	})
});

// GET Test page
router.get('/orders/', function(req, res) {
	getOrders(req.db, req.user, '', function(err, data) {
		res.send(data)
	})
});

router.get('/orders/kitchen', function(req, res) {
	/*
		output:
		[{
			order instance
				menuitems
					orderitems
				table number
			}
		]
		*/
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

// POST Create new users
router.post('/users/', function(req, res) {
	console.log(req.body)
	// must be manager
	var newuser = req.body
	checkManager(req.user, function(err, isManager) {
		if (isManager) {
			console.log('requesting user is manager')
			// validate data here
			getClient(req.db, req.user, function(err, client) {
				// found client
				// not checking for existing user here, need to validate
				client.createUser({
					'username': newuser.username,
					'password': newuser.password,
					'email': newuser.email,
					'firstname': newuser.firstname,
					'lastname': newuser.lastname,
					'RoleId': newuser.roleid
				}).then(function (user) {
					console.log('created new user ' + user.username)
					res.sendStatus(200)
				})
			})
		} else {
			console.log('requesting user is not manager')
			res.sendStatus(403)
		}
	})
});

// POST Create new users
router.post('/menu/', function(req, res) {
	console.log(req.body)
	// must be manager
	var newmenuitem = req.body
	checkManager(req.user, function(err, isManager) {
		if (isManager) {
			console.log('requesting user is manager')
			// validate data here
			getClient(req.db, req.user, function(err, client) {
				// found client
				// not checking for existing user here, need to validate
				client.createMenuItem(newmenuitem).then(function (item) {
					console.log('created new menuitem ' + item.name + ' for client ' + item.ClientId)
					res.sendStatus(200)
				})
			})
		} else {
			console.log('requesting user is not manager')
			res.sendStatus(403)
		}
	})
});

// POST place orders for tables
router.post('/tables/:id', function(req, res) {
	// place order on table
	console.log('post received')
	// waiter info = req.user

	var neworder = {
		'order': req.body,
		'tableno': req.params.id,
		'tableIsFree': true
	}

	var validateOrder = function(db, table, order, cb) {
		/*
		expected input:
			{
			order: [ {
					menuitemId,
					sides = [{menuitemId}]
				} ]
			tableno: number in table 'Tables'
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

			db.Client.findOne({'where': {'id': req.user.ClientId }}).then(function(client) { 
				client.getTables({where: {number: table} }).then(function(tables) {
					if (tables[0]) {
						// table exists
						if (tables[0].isfree) {
							// new customer
							console.log('new order, new customer')
							validateOrderItems(client, order, function(err, success) {
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
							neworder.tableIsFree = false
							console.log('new order, existing customer')
							validateOrderItems(client, order, function(err, success) {
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

		var createOrderItems = function(thei, order, orderinstance) {
			if (order.order[thei].sides) {
				db.OrderItems.create({
					status: 'ordered',
					MenuItemId: order.order[thei].menuitemId,
					OrderId: orderinstance.id
				}).then(function(orderitem) {
					for(j=0; j<order.order[thei].sides.length; j++) {
						db.OrderItems.create({
							status: 'ordered',
							MenuItemId: order.order[thei].sides[j].menuitemId,
							OrderId: orderinstance.id,
							OrderItemId: orderitem.id
						})
					}
				})
			} else {
				db.OrderItems.create({
					status: 'ordered',
					MenuItemId: order.order[thei].menuitemId,
					OrderId: orderinstance.id
				})
			}
		}

		var placeOrderExisting = function(db, user, order, cb) {
			// place order when customer exists
			db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
				db.Customer.findOne({'where': {
					'ClientId': user.ClientId,
					'TableId': order.tableno,
					'haspayed': false
				}}).then(function(customer) {
					// create new order
					client.createOrder({
						CustomerId: customer.id,
						UserId: user.id
					}).then(function(orderinstance) {
						// loop through the orderitems and create them
						for (i=0; i<order.order.length; i++) {
							createOrderItems(i, order, orderinstance)
							if ( i+1 == neworder.order.length) {
								// finished
								cb(null, true)
							}
						}
					})
				})
			})
		}

		var placeOrderNew = function(db, user, order, cb) {
			// place order when new customer
			db.Client.findOne({'where': {'id': user.ClientId }}).then(function(client) {
				// create new customer
				client.createCustomer({
					'UserId': user.id,
					'TableId': order.tableno
				}).then(function(customer) {
					// find the table instance
					db.Table.findOne({
						'where': {'id': customer.TableId}
					}).then(function(table) {
						// set table to isFree = false
						table.update({
							'isfree': false
						}).then(function() {
							// create new order
							client.createOrder({
								CustomerId: customer.id,
								UserId: user.id
							}).then(function(orderinstance) {
								// loop through the orderitems and create them
								for (i=0; i<order.order.length; i++) {
									createOrderItems(i, order, orderinstance)
									if ( i+1 == neworder.order.length) {
										// finished
										cb(null, true)
									}
								}
							})
						})
					})
				})
			})
		};

		validateOrder(req.db, neworder.tableno, neworder.order, function (err, validation) {
			if (validation) {
				// successfully validated
				console.log('place new order now')
				if (neworder.tableIsFree) {
					placeOrderNew(req.db, req.user, neworder, function(err, success) {
						if (success) {
							console.log('placed successfully');
							res.sendStatus(200)
						}
					})
				} else {
					placeOrderExisting(req.db, req.user, neworder, function(err, success) {
						if (success) {
							console.log('placed successfully');
							res.sendStatus(200)
						}
					})
				}
			}
		})
	});





module.exports = router;