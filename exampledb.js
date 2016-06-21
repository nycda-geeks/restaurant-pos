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

		client.createUser({
			'username': 'mario',
			'password': 'mario',
			'email': 'mario@gmx.de',
			'firstname': 'Mario',
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
			'name': 'Steak 200g',
			'category': 'Main courses',
			'price': 15.00,
			'amountofsides': 2
		})		

		client.createMenuItem({
			'name': 'Fries',
			'category': 'Sides',
			'isside': true,
			'price': 3.50,
			'sideprice': 0
		})

		client.createMenuItem({
			'name': 'Small Salad',
			'category': 'Sides',
			'isside': true,
			'price': 3.50,
			'sideprice': 0,
			'isvegan': true
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
								CustomerId: customer.id,
								UserId: user[0].id
							}).then(function(order) {

								// item2 with side - returning id
								client.getMenuItems({
									'where': {'name': 'Steak 200g'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ordered',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									}).then(function(orderitem) {

										client.getMenuItems({
											'where': {'name': 'Fries'}
										}).then(function(menuitem) {
											console.log(orderitem)
											db.OrderItems.create({
												status: 'ordered',
												MenuItemId: menuitem[0].id,
												OrderId: order.id,
												OrderItemId: orderitem.id
											})
										})

									})
								})



								client.getMenuItems({
									'where': {'name': 'Coca-Cola 0.33l'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ready',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									})
								})






							})


						})
					})
				})
			})

		}, 3000);



		setTimeout(function() {
			// wait 5 sec before create customer
			client.getUsers({'where': {'username': 'mario'}}).then(function(user){
				
				client.createCustomer({
					'UserId': user[0].id,
					'TableId': 3
				}).then(function(customer) {
					
					db.Table.findOne({
						'where': {'id': customer.TableId}
					}).then(function(table) {
						
						table.update({
							'isfree': false
						}).then(function() {

							client.createOrder({
								CustomerId: customer.id,
								UserId: user[0].id
							}).then(function(order) {

								// item2 with side - returning id
								client.getMenuItems({
									'where': {'name': 'Pizza Veggie'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ordered',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									})
								})

								client.getMenuItems({
									'where': {'name': 'Sparkling Water 0.33l'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ready',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									})
								})
							})

							client.createOrder({
								CustomerId: customer.id,
								UserId: user[0].id
							}).then(function(order) {

								// item2 with side - returning id
								client.getMenuItems({
									'where': {'name': 'Coca-Cola 0.33l'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ordered',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									})
								})
							})


						})
					})
				})
			})

		}, 3000);


		setTimeout(function() {
			// wait 5 sec before create customer
			client.getUsers({'where': {'username': 'luigi'}}).then(function(user){
				
				client.createCustomer({
					'UserId': user[0].id,
					'TableId': 2
				}).then(function(customer) {
					
					db.Table.findOne({
						'where': {'id': customer.TableId}
					}).then(function(table) {
						
						table.update({
							'isfree': false
						}).then(function() {

							client.createOrder({
								CustomerId: customer.id,
								UserId: user[0].id
							}).then(function(order) {

								// item2 with side - returning id
								client.getMenuItems({
									'where': {'name': 'Pizza Ham'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ordered',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									})
								})

								client.getMenuItems({
									'where': {'name': 'Pizza Salami'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ordered',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									})
								})

								client.getMenuItems({
									'where': {'name': 'Small Salad'}
								}).then(function(menuitem) {
									db.OrderItems.create({
										status: 'ordered',
										MenuItemId: menuitem[0].id,
										OrderId: order.id
									})
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











