module.exports = function(sequelize, DataTypes) {
	var Order = sequelize.define("Order", {
		comment: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(models) {
				Order.belongsTo(models.Client),
				Order.belongsTo(models.Customer),
				Order.belongsToMany(models.MenuItem, {through: 'OrderItems'})
			}
		}
	});
	return Order;
};