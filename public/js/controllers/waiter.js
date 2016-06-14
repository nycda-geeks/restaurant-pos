angular.module('restaurantPOS')
	.controller('WaiterController', ['$scope', '$http', function($scope, $http) {
		$scope.drinks = [
			{
				name: 'Heinekin',
				price: 2,
				active: false
			}, {
				name: 'Amstel',
				price: 2,
				active: false
			}, {
				name: 'Corona',
				price: 3,
				active: false
			}, {
				name: 'Berliner',
				price: 2.50,
				active: false
			}
		];

		$scope.toggleActive = function(d) {
			d.active = !d.active;
		};

		$scope.total = function() {
			var total = 0;

			angular.forEach($scope.drinks, function(d) {
				if (d.active) {
					total += d.price;
				}
			});

			return total;
		};
	}]);