angular.module('restaurantPOS')
	.controller('kitchenController', ['$scope', '$http', function($scope, $http) {
		
		$http.get('/v1/orders/').then(function(res) {
			$scope.order = res.data;
		});

		$scope.orderitems = function() {
			var orderItems = [];
			angular.forEach($scope.order, function(m) {
				orderItems.push(m.Menu);
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

		$scope.yetReady = function() {
			$http.get('/v1/orders/kitchen').success(function(res) {
				$scope.order = res.data;
			});
			
		}

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

		$scope.timeSince = function() {
			var now = new Date();
			var timeSince = now - $scope.order.createdAt;
			return timeSince;
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