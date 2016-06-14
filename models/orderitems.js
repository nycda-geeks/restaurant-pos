module.exports = function(sequelize, DataTypes) {
	var OrderItems = sequelize.define("OrderItems", {
		status: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	return OrderItems;
};