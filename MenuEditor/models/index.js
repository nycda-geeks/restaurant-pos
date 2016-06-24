var db                    = require('./connect.js')

var menuInfo              = require('./menu.js')
var userInfo              = require('./user.js')
var clientInfo            = require('./client.js')
var orderInfo             = require('./order.js')
var tableInfo             = require('./table.js')
var orderItemsInfo        = require('./orderitems.js')
var roleInfo              = require('./defaultrole.js')
var customerInfo          = require('./customer.js')

var MenuItem              = db.define('MenuItem', menuInfo.attributes, menuInfo.options)
var User                  = db.define('User', userInfo.attributes, userInfo.options)
var Client                = db.define('Client', clientInfo.attributes, clientInfo.options)
var Order                 = db.define('Order', orderInfo.attributes, orderInfo.options)
var Table                 = db.define('Table', tableInfo.attributes, tableInfo.options)
var OrderItems            = db.define('OrderItems', orderItemsInfo.attributes, orderItemsInfo.options)
var Role                  = db.define('Role', roleInfo.attributes, roleInfo.options)
var Customer              = db.define('Customer', customerInfo.attributes, customerInfo.options)

MenuItem.belongsTo(Client, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })

User.belongsTo(Client, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
User.belongsTo(Role)
User.hasMany(Customer)

Client.hasMany(User)
Client.hasMany(MenuItem)
Client.hasMany(Customer)
Client.hasMany(Order)
Client.hasMany(Table)

Order.belongsTo(Client, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
Order.belongsTo(Customer, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
Order.belongsToMany(MenuItem, {through: 'OrderItems'})

Table.belongsTo(Client, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })

Customer.belongsTo(Client, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
Customer.belongsTo(Table, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
Customer.belongsTo(User, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
Customer.hasMany(Order)

db.sync().then(function(){
  console.log("sync complete bitch")
})

module.exports.MenuItem   = MenuItem
module.exports.User       = User
module.exports.Client     = Client
module.exports.Order      = Order
module.exports.Table      = Table
module.exports.OrderItems = OrderItems
module.exports.Role       = Role
module.exports.Customer   = Customer 
module.exports.db         = db