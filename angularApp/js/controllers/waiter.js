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

	    $scope.moveItem = function(item, from, to) {

	        console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
	        //Here from is returned as blank and to as undefined

	        var idx=from.indexOf(item);
	        if (idx != -1) {
	            from.splice(idx, 1);
	            to.push(item);      
	        }
	    };
   


	}]);