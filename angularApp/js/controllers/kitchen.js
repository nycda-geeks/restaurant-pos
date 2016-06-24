angular.module('restaurantPOS')
	.controller('kitchenController', ['$scope', '$http', function($scope, $http) {
		
		$http.get('/v1/orders/kitchen').then(function(res) {
			$scope.order = res.data;
		});


		$scope.orderitems = function() {
			var orderItems = [];
			angular.forEach($scope.order.MenuItems, function(m) {
				orderItems.push(m);
			});
			return orderItems;
		};

		$scope.array = $scope.orderitems();

		$scope.orderedItems = function() {
			var orderedItems = [];
			angular.forEach($scope.orderitems(), function(m) {
				orderedItems.push(m.name);
			});
			return orderedItems;
		}

		// TOTAL QUANTITY OF ORDER
		$scope.totalq = function() {
			var totalq = 0;
			angular.forEach($scope.order, function() {
				totalq = totalq + 1;
			});
			return totalq;
		};

		var indexedFood = [];

		$scope.foodToFilter = function() {
			indexedFood = [];
			return $scope.orderitems();
		}

		$scope.filterCategories = function(food) {
			var categoryNew = indexedFood.indexOf($scope.orderitems().category) == -1;
			if (categoryNew) {
				indexedFood.push(food.category);
			}
			return categoryNew;
		}


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