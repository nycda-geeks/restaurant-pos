var Sequelize = require('sequelize');



var attributes = {
	
	status: {
		type: Sequelize.STRING,
		allowNull: false,
	}
	

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options



