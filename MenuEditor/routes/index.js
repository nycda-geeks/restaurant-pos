var express = require('express');
var router = express.Router();
var Model = require('../models/index.js')
var path = require('path')

// add menu item number based on client input. 


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

router.post('/api/v1/menuitems', function(req,res){
	
	//var clientid = req.user.clientid

	var newMenuItem = req.body
		


	Model.MenuItem.create(newMenuItem).then(function(){
		Model.MenuItem.findAll().then(function(menuitems){
			var data = menuitems.map(function(items){
				return {
					id: items.dataValues.id,
					name: items.dataValues.name,
					category: items.dataValues.category,
					price: items.dataValues.price,
					isside: items.dataValues.isside,
					singleprice: items.dataValues.singleprice,
					isdrink: items.dataValues.isdrink,
					isvegan: items.dataValues.isvegan,
					isveggie: items.dataValues.isveggie,
					itemnumber: items.dataValues.itemnumber,
				}
			})
			res.json(data)
			console.log(data)
		})
	})

})

router.get('/api/v1/menuitems/', function(req,res){
	//var id = req.user.clientid

	Model.MenuItem.findAll(/*{where:{ClientId:id}}*/).then(function(menuitems){
		var data = menuitems.map(function(items){
				return {
					id: items.dataValues.id,
					name: items.dataValues.name,
					category: items.dataValues.category,
					price: items.dataValues.price,
					isside: items.dataValues.isside,
					singleprice: items.dataValues.singleprice,
					isdrink: items.dataValues.isdrink,
					isvegan: items.dataValues.isvegan,
					isveggie: items.dataValues.isveggie,
					itemnumber: items.dataValues.itemnumber,
				}
			})

		res.json(data)
		console.log(data)
	})
})

router.get('/api/v1/menuitems/:menuitem_id', function(req,res){
	var id = req.params.menuitem_id
	Model.MenuItem.findOne({where: {id:id}}).then(function(item){
		var data = item
		res.json(data)
			console.log("jaaaaaaaaa" + data)
	})
})

router.put('/api/v1/menuitems/:menuitem_id', function(req,res){
	var id = req.params.menuitem_id
	var updateMenuItem = req.body
	
	Model.MenuItem.update(updateMenuItem,{where: {id:id}}).then(function(){
		Model.MenuItem.findAll().then(function(menuitems){
			var data = menuitems.map(function(items){
				return {
					id: items.dataValues.id,
					name: items.dataValues.name,
					category: items.dataValues.category,
					price: items.dataValues.price,
					isside: items.dataValues.isside,
					singleprice: items.dataValues.singleprice,
					isdrink: items.dataValues.isdrink,
					isvegan: items.dataValues.isvegan,
					isveggie: items.dataValues.isveggie,
					itemnumber: items.dataValues.itemnumber,
				}
			})
			res.json(data)
			console.log(data)
			console.log("ja dit zou m moeten zijn: " + updateMenuItem.name)
		})
	})
})

router.delete('/api/v1/menuitems/:menuitem_id', function(req,res){
	var id = req.params.menuitem_id
	Model.MenuItem.destroy({where: {id:id}}).then(function(){
		Model.MenuItem.findAll().then(function(menuitems){
			var data = menuitems.map(function(items){
				return {
					id: items.dataValues.id,
					name: items.dataValues.name,
					category: items.dataValues.category,
					price: items.dataValues.price,
					isside: items.dataValues.isside,
					singleprice: items.dataValues.singleprice,
					isdrink: items.dataValues.isdrink,
					isvegan: items.dataValues.isvegan,
					isveggie: items.dataValues.isveggie,
					itemnumber: items.dataValues.itemnumber,
				}
			})
			res.json(data)
			console.log(data)
		})
	})
})

module.exports = router;
