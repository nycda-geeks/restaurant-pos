angular.module('restaurantPOS')
	.controller('kitchenController', ['$scope', '$http','shareOrder', function($scope, $http, shareOrder) {
		$http.get('/').then(function(res) {
			$scope.order = res.data;
		})

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

		$scope.order = shareOrder.getOrder();




	}]);