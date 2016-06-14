module.exports = function(sequelize, DataTypes) {
	var OrderItems = sequelize.define("OrderItems", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})

	OrderItems.hasMany(OrderItems, {as: 'side'})
	return OrderItems;
};