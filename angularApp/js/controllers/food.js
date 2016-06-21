angular.module('restaurantPOS')
	.controller('FoodController', ['$scope', '$http', function($scope, $http) {
		$scope.food = [
			{
				name: 'Pizza',
				price: 4,
				active: false,
				quantity: 0
			}, {
				name: 'Calzone',
				price: 2,
				active: false,
				quantity: 0
			}, {
				name: 'Spaghetti',
				price: 5.50,
				active: false,
				quantity: 0
			}, {
				name: 'Lasagna',
				price: 6.50,
				active: false,
				quantity: 0
			}
		];

		$scope.addOne = function(f) {
			f.quantity++;
		};

		$scope.removeOne = function(f) {
			if (f.quantity > 0) {
				f.quantity--;
			}
		};

		$scope.toggleActive = function(f) {
			if (f.quantity > 0) {
				f.active = true;
			}
			else {
				f.active = false;
			}
		};

		$scope.total = function() {
			var total = 0;

			angular.forEach($scope.food, function(f) {
				if (f.quantity > 0) {
					total += (f.price * f.quantity);
				}
			});

			return total;
		};

		$scope.totalq = function() {
			var totalq = 0;

			angular.forEach($scope.food, function(f) {
				if (f.quantity > 0) {
					totalq += f.quantity;
				}
			});

			return totalq;
		}
	}]);