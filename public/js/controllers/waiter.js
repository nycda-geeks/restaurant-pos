angular.module('restaurantPOS')
	.controller('WaiterController', ['$scope', '$http', function($scope, $http) {
		$scope.tables = [
			{
				table_number: 1,
				table_isfree: true
			}, {
				table_number: 2,
				table_isfree: true
			}, {
				table_number: 3,
				table_isfree: true
			}, {
				table_number: 4,
				table_isfree: true
			}, {
				table_number: 5,
				table_isfree: false
			}
		];

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