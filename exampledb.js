// sequelize db config 
var db = require("./models");
db.sequelize.sync({force: true})
.then(function() {
	console.log('connected to db')
	console.log('now inserting two new clients')

	db.Role.create({
		'name': 'Manager',
		'description': 'Manager of a restaurant, has unrestricted access to the admin panel',
		'defaultview': 'checkout',
		'isadmin': true
	})

	db.Role.create({
		'name': 'Waiter',
		'description': 'Waiter role',
		'defaultview': 'waiter'
	})

	db.Client.create({
		'name': 'Pizzeria Ciao',
		'description': 'Great pizza, great prices'
	}).then(function(client) {

		client.createUser({
			'username': 'luigi',
			'password': 'luigi',
			'email': 'luigi@gmx.de',
			'firstname': 'Luigi',
			'lastname': 'Mario'
		})

		client.createMenuItem({
			'name': 'Pizza Salami',
			'category': 'Pizza',
			'price': 6.50
		})

		client.createMenuItem({
			'name': 'Pizza Ham',
			'category': 'Pizza',
			'price': 7.00
		})

		client.createMenuItem({
			'name': 'Pizza Veggie',
			'category': 'Pizza',
			'price': 9.00,
			'isveggie': true
		})

		client.createMenuItem({
			'name': 'Coca-Cola 0.33l',
			'category': 'Soft Drinks',
			'price': 2.50,
			'isdrink': true
		})

		client.createMenuItem({
			'name': 'Sparkling Water 0.33l',
			'category': 'Soft Drinks',
			'price': 1.50,
			'isdrink': true
		})

		client.createTable({
			'number': 1
		})
		client.createTable({
			'number': 2
		})
		client.createTable({
			'number': 3
		})

		setTimeout(function() {
			// wait 5 sec before create customer
			client.getUsers({'where': {'username': 'luigi'}}).then(function(user){
				
				client.createCustomer({
					'UserId': user[0].id,
					'TableId': 1
				}).then(function(customer) {
					
					db.Table.findOne({
						'where': {'id': customer.TableId}
					}).then(function(table) {
						
						table.update({
							'isfree': false
						}).then(function() {

							client.createOrder({
								'CustomerId': customer.id,
							}).then(function(order) {
								console.log(order)
								client.getMenuItems({
									'where': {'name': 'Pizza Salami'}
								}).then(function(menuitem) {
									order.addMenuItem(menuitem[0], {status: 'ordered'})
								})

								client.getMenuItems({
									'where': {'name': 'Coca-Cola 0.33l'}
								}).then(function(menuitem) {
									order.addMenuItem(menuitem[0], {status: 'ordered'})
								})

							})


						})
					})
				})
			})

		}, 3000);


	})

	db.Client.create({
		'name': 'Restaurant Zeus',
		'description': 'A nice Greek restaurant in the middle of Amsterdam'
	}).then(function(client) {

		client.createUser({
			'username': 'zeus',
			'password': 'zeus',
			'email': 'zeus@gmx.de',
			'firstname': 'Zeus',
			'lastname': 'God'
		})

		client.createMenuItem({
			'name': 'Gyros with Tzaziki',
			'category': 'Main courses',
			'price': 11.50
		})

		client.createMenuItem({
			'name': 'Gyros without Tzaziki',
			'category': 'Main courses',
			'price': 11.00
		})

		client.createMenuItem({
			'name': 'Sparkling Water 0.33l',
			'category': 'Soft Drinks',
			'price': 1.50,
			'isdrink': true
		})

		client.createMenuItem({
			'name': 'Ouzo',
			'category': 'Spirits',
			'price': 2.00,
			'isdrink': true
		})

		client.createTable({
			'number': 1
		})
		client.createTable({
			'number': 2
		})
		client.createTable({
			'number': 3
		})
	})


})











