module.exports = function(sequelize, DataTypes) {
	var Client = sequelize.define("Client", {
		name: DataTypes.STRING,
		friendlyname: DataTypes.STRING,
		description: DataTypes.TEXT,
		logo: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Client.hasMany(models.User),
				Client.hasMany(models.MenuItem),
				Client.hasMany(models.Customer),
				Client.hasMany(models.Order),
				Client.hasMany(models.Table)
			}
		}
	});
	return Client;
};