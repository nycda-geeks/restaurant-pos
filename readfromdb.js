// sequelize db config 
var db = require("./models");
db.sequelize.sync()
.then(function() {
	console.log('connected to db')
	db.Client.findOne({'where': {'name': 'Pizzeria Ciao'}}).then(function(client) {
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
		}).then(function(orders) {

			sortOrders(orders, function(order){
				console.log(order)
			})

		})

	})

})



sortOrders = function(orders, cb) {
	for (i=0; i<orders.length; i++) {
		var order = {
			'restaurant': orders[i].ClientId,
			'waiter': orders[i].Customer.User.username,
			'table': orders[i].Customer.TableId,
			'items': []
		}

		for (j=0; j<orders[i].MenuItems.length; j++) {
			order.items.push({
				'itemname': orders[i].MenuItems[j].name,
				'status': orders[i].MenuItems[j].OrderItems.status
			})
		}

		cb(order)
	}
}