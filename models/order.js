module.exports = function(sequelize, DataTypes) {
	var Order = sequelize.define("Order", {
		comment: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(models) {
				Order.belongsTo(models.Client, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
				Order.belongsTo(models.Customer, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
				Order.belongsToMany(models.MenuItem, {through: 'OrderItems'})
			}
		}
	});
	return Order;
};