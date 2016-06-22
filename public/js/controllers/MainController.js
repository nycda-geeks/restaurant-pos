angular.module('restaurantPOS')
	.controller('MainController', ['$scope', '$http', function($scope, $http) {
		$scope.register = function() {
			$http.post('/')
		}
	}]);