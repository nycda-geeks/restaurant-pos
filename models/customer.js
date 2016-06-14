module.exports = function(sequelize, DataTypes) {
	var Customer = sequelize.define("Customer", {
		haspayed: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function(models) {
				Customer.belongsTo(models.Client),
				Customer.belongsTo(models.Table),
				Customer.belongsTo(models.User),
				Customer.hasMany(models.Order)
			}
		}
	});
	return Customer;
};