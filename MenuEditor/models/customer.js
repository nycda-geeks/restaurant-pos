var Sequelize = require('sequelize');



var attributes = {
	
	haspayed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
	

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options


