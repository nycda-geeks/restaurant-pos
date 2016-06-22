angular.module('restaurantPOS')
	.controller('WaiterController', ['$scope', '$http', function($scope, $http) {

		$http.get('/v1/tables').then(function(res) {
			$scope.tables = res.data;
		})

		$scope.favtables = [];

		$scope.add = function(index) {
			$scope.favtables.push($scope.tables[index]);
			$scope.tables.splice(index, 1);
		}

		$scope.remove = function(index) {
			$scope.tables.push($scope.favtables[index]);
			$scope.favtables.splice(index, 1);
		}


	}]);