module.exports = function(sequelize, DataTypes) {
	var Customer = sequelize.define("Customer", {
		haspayed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {
			associate: function(models) {
				Customer.belongsTo(models.Client, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
				Customer.belongsTo(models.Table, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
				Customer.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
				Customer.hasMany(models.Order)
			}
		}
	});
	return Customer;
};