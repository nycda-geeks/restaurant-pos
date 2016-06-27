module.exports = function(sequelize, DataTypes) {
	var MenuItem = sequelize.define("MenuItem", {
		name: DataTypes.STRING,
		number: DataTypes.INTEGER,
		category: DataTypes.STRING,
		price: DataTypes.FLOAT,
		amountofsides: DataTypes.INTEGER,
		isside: DataTypes.BOOLEAN,
		sideprice: DataTypes.FLOAT,
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
