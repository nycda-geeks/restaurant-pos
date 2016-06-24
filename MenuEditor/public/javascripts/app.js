angular.module('menuItems', ['xeditable'])



.controller('mainCtrl', ['$scope','$http', function($scope, $http){
	
	
	$scope.formData = {}
	$scope.itemData = {}
	$scope.editData = {}

	$http.get('/api/v1/menuitems')
	.success(function(data){
		$scope.itemData = data
		console.log("get :" + data)
	})
	.error(function(error){
		console.log("Error :" + error)
	})

	$scope.createItem = function() {
		$http.post('/api/v1/menuitems', $scope.formData)
		.success(function(data){
			$scope.formData = {}
			$scope.itemData = data
			console.log("create : " + data)
		})
		.error(function(error){
			console.log('Error: ' + error)
		})
	}

	$scope.deleteItem = function(menuitemID) {
		$http.delete('/api/v1/menuitems/' + menuitemID)
		.success(function(data){
			$scope.itemData = data
			console.log("delete: " + data)
		})
		.error(function(error){
			console.log('Error: ' + error)
		})
	}

	$scope.updateItem = function(menuitemID) {
		$http.put('/api/v1/menuitems/' + menuitemID, $scope.editData)
		.success(function(data){
			$scope.editData = {}
			$scope.itemData = data 
			console.log(data)
		})
		.error(function(error){
			console.log('Error: ' + error)
		})
	}
	


}])







