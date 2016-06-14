angular.module('restaurantPOS')
	.controller('DrinksController', ['$scope', '$http', function($scope, $http) {
		$scope.drinks = [
			{
				name: 'Heinekin',
				price: 2,
				active: false,
				quantity: 0
			}, {
				name: 'Amstel',
				price: 2,
				active: false,
				quantity: 0
			}, {
				name: 'Corona',
				price: 3,
				active: false,
				quantity: 0
			}, {
				name: 'Berliner',
				price: 2.50,
				active: false,
				quantity: 0
			}
		];

		$scope.addOne = function(d) {
			d.quantity++;
		};

		$scope.removeOne = function(d) {
			if (d.quantity > 0) {
				d.quantity--;
			}
		};

		$scope.toggleActive = function(d) {
			if (d.quantity > 0) {
				d.active = true;
			}
			else {
				d.active = false;
			}
		};

		$scope.total = function() {
			var total = 0;

			angular.forEach($scope.drinks, function(d) {
				if (d.quantity > 0) {
					total += (d.price * d.quantity);
				}
			});

			return total;
		};
	}]);