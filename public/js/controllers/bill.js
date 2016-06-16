angular.module('restaurantPOS')
	.controller('billController', ['$scope', '$http','shareOrder', function($scope, $http, shareOrder) {


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

	/*
	$scope.orderItems = [
			{
				MenuItem: {
					name: 
				}
			}, {
				status: ,
				OrderItemId: true,
				OrderId: ,
				MenuItemId: 2
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
		$scope.menuItems = [];
		*/