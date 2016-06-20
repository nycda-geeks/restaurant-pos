module.exports = function(sequelize, DataTypes) {
	var Customer = sequelize.define("Customer", {
		haspayed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		billprice: DataTypes.FLOAT,
		billamountincltip: DataTypes.FLOAT,
		billpaymethod: DataTypes.STRING
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