// sequelize db config 
var db = require("./models");
db.sequelize.sync({force: true})
.then(function() {
	console.log('connected to db')
	console.log('now inserting two new clients')

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



	})

	db.Client.create({
		'name': 'Restaurant Zeus',
		'description': 'A nice Greek restaurant in the middle of Amsterdam'
	}).then(function(client) {
		console.log('created restaurant zeus')

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


	})


})











