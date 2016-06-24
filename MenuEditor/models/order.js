var Sequelize = require('sequelize');



var attributes = {
	
	comment: {
		type: Sequelize.TEXT,
	}

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options





