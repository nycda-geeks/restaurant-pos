var Sequelize = require('sequelize');



var attributes = {
	
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	category:{
		type: Sequelize.STRING,
	},
	price: {
		type: Sequelize.FLOAT,
	},
	isside: {
		type: Sequelize.BOOLEAN,
	},
	singleprice: {
		type: Sequelize.FLOAT,
	},
	isdrink: {
		type: Sequelize.BOOLEAN,
	},
	isveggie: {
		type: Sequelize.BOOLEAN,
	},
	isvegan: {
		type: Sequelize.BOOLEAN,
	},
	itemnumber: {
		type: Sequelize.FLOAT,
		unique: true,
	} 

}

var options = {

	freezeTableName: true,
	
}

module.exports.attributes = attributes
module.exports.options    = options











