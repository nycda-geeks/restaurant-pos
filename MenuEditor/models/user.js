var Sequelize = require('sequelize');



var attributes = {
	
	username: {
		type: Sequelize.STRING,
	},
	password:{
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	firstname: {
		type: Sequelize.STRING,
	},
	lastname: {
		type: Sequelize.STRING,
	},
	employeeid: {
		type: Sequelize.INTEGER,
	}
	

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options





