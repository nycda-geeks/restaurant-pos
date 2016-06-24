//CONNECT TO DATABASE

var express   = require('express')
var path      = require('path')
var Sequelize = require('sequelize')
var sequelize = new Sequelize('restaurantpos', 'maartje', 'hartje123', 
{
	host: '192.168.99.100',
	port: '32768',
	dialect: 'postgres'
})

module.exports = sequelize