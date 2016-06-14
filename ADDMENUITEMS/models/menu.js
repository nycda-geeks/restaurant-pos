module.exports = function(sequelize, DataTypes) {
	var MenuItem = sequelize.define("MenuItem", {
		name: DataTypes.STRING,
		category: DataTypes.STRING,
		price: DataTypes.FLOAT,
		isside: DataTypes.BOOLEAN,
		singleprice: DataTypes.FLOAT,
		isdrink: DataTypes.BOOLEAN,
		isveggie: DataTypes.BOOLEAN,
		isvegan: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function(models) {
				MenuItem.belongsTo(models.Client, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
			}
		}
	});
	return MenuItem;
};