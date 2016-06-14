module.exports = function(sequelize, DataTypes) {
	var Role = sequelize.define("Role", {
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		defaultview: DataTypes.STRING,
		isadmin: DataTypes.BOOLEAN
	});
	return Role;
};