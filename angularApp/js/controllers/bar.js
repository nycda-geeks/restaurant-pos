angular.module('restaurantPOS')
	.controller('barController', ['$scope', '$http', function($scope, $http) {
		$http.get('/').then(function(res) {
			$scope.drinkorder = res.data;
		});

		// TOTAL QUANTITY OF ORDER
		$scope.totalq = function() {
			var totalq = 0;
			angular.forEach($scope.order, function() {
				totalq = totalq + 1;
			});
			return totalq;
		};

	}]);