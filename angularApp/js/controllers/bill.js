angular.module('restaurantPOS')
	.controller('billController', ['$scope', '$http', '$location', function($scope, $http, $location) {
		
		//TABLE NUMBER FROM URL
		$scope.params = $location.path().split('/')[3] || "Unknown";

		$http.get('/v1/tables/'+$scope.params).then(function(res) {
			$scope.order = res.data;
		});

		$scope.orders = function() {
			var orders = [];
			for (var i = 0; i < $scope.order.length; i++) {
				for (var j = 0; j < $scope.order[i].Customers[0].Orders.length; j++) {
					for (var k = 0; k < $scope.order[i].Customers[0].Orders[j].MenuItems.length; k++) {
							orders.push(
								{name: $scope.order[i].Customers[0].Orders[j].MenuItems[k].name,  
								price: $scope.order[i].Customers[0].Orders[j].MenuItems[k].price}
							);
					}
				}
			}
			return orders;
		};



		//TOTAL PRICE OF ORDER
		$scope.total = function() {
			var total = 0;
			angular.forEach($scope.orders(), function(m) {
				total += m.price;
			});
			return total;
		};

		// TOTAL QUANTITY OF ORDER
		$scope.totalq = function() {
			var totalq = 0;
			angular.forEach($scope.orders(), function() {
				totalq = totalq + 1;
			});
			return totalq;
		};




	}]);

