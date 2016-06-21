module.exports = function(sequelize, DataTypes) {
	var Table = sequelize.define("Table", {
		number: DataTypes.INTEGER,
		isfree: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	}, {
		classMethods: {
			associate: function(models) {
				Table.belongsTo(models.Client, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
				Table.hasMany(models.Customer)
			}
		}
	});
	return Table;
};