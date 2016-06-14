module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		employeeid: DataTypes.INTEGER
	}, {
		classMethods: {
			associate: function(models) {
				User.belongsTo(models.Client, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
				User.belongsTo(models.Role),
				User.hasMany(models.Customer)
			}
		}
	});
	return User;
};