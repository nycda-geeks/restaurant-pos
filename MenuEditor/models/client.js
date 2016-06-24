var Sequelize = require('sequelize');



var attributes = {
	
	name: {
		type: Sequelize.STRING,
	},
	description:{
		type: Sequelize.TEXT,
	},
	logo: {
		type: Sequelize.STRING,
	}

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options





