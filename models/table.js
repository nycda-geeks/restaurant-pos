module.exports = function(sequelize, DataTypes) {
	var Table = sequelize.define("Table", {
		number: DataTypes.INTEGER,
		isfree: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function(models) {
				Table.belongsTo(models.Client)
			}
		}
	});
	return Table;
};