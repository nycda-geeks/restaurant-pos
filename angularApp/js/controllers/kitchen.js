angular.module('restaurantPOS')
	.controller('kitchenController', ['$scope', '$http', function($scope, $http) {
		$http.get('/').then(function(res) {
			$scope.order = res.data;
		});

		// TOTAL QUANTITY OF ORDER
		$scope.totalq = function() {
			var totalq = 0;
			angular.forEach($scope.order, function() {
				totalq = totalq + 1;
			});
			return totalq;
		};

		/*
		$scope.$on('data_shared', function() {
			var order = dataShare.getData();
			angular.forEach(order, function(m) {
				$scope.order.push(m);
			});
		});

		$scope.getMenuItems = function() {
			angular.forEach($scope.orderItems, function(m) {

			})
		}
		*/




	}]);