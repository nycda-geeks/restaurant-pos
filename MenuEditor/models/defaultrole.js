var Sequelize = require('sequelize');



var attributes = {
	
	name: {
		type: Sequelize.STRING,
	},
	description:{
		type: Sequelize.TEXT,
	},
	defaultview: {
		type: Sequelize.STRING,
	},
	isadmin: {
		type: Sequelize.STRING,
		defaultValue: false,
	}
	

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options
