module.exports = function(sequelize, DataTypes) {
	var MenuItem = sequelize.define("MenuItem", {
		name: DataTypes.STRING,
		category: DataTypes.STRING,
		price: DataTypes.FLOAT,
		isside: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		singleprice: DataTypes.FLOAT,
		isdrink: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		isveggie: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		isvegan: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {
			associate: function(models) {
				MenuItem.belongsTo(models.Client)
			}
		}
	});
	return MenuItem;
};