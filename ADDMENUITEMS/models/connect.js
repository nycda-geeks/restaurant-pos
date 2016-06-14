//CONNECT TO DATABASE
var express = require('express')
var path = require('path')
var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://maartje:hartje123@192.168.99.100:32772/restaurantpos')
// var sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blogapp2')
module.exports = sequelize

