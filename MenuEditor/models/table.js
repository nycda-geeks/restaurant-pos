var Sequelize = require('sequelize');



var attributes = {
	
	number: {
		type: Sequelize.INTEGER,
	},

	isfree: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	}
	

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options

