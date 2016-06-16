angular.module('restaurantPOS')
	.controller('newOrderController', ['$scope', '$http','$location', 'shareOrder', function($scope, $http, $location, shareOrder) {
		$scope.menuitems = [
			{
				name: 'Heinekin',
				price: 2,
				amountofsides: 0,
				isside: false,
				sideprice: 0,
				isdrink: true,
				isveggie: false,
				isvegan: false
			}, {
				name: 'Amstel',
				price: 2,
				amountofsides: 0,
				isside: false,
				sideprice: 0,
				isdrink: true,
				isveggie: false,
				isvegan: false
			}, {
				name: 'Berliner',
				price: 3,
				amountofsides: 0,
				isside: false,
				sideprice: 0,
				isdrink: true,
				isveggie: false,
				isvegan: false
			}, {
				name: 'Pizza',
				price: 4,
				amountofsides: 2,
				isside: false,
				sideprice: 0,
				isdrink: false,
				isveggie: false,
				isvegan: false
			}, {
				name: 'Calzone',
				price: 4.50,
				amountofsides: 1,
				isside: false,
				sideprice: 0,
				isdrink: false,
				isveggie: false,
				isvegan: false
			}, {
				name: 'Spaghetti',
				price: 6,
				amountofsides: 2,
				isside: false,
				sideprice: 0,
				isdrink: false,
				isveggie: false,
				isvegan: false
			}, {
				name: 'Fries',
				price: 2,
				amountofsides: 0,
				isside: true,
				sideprice: 1,
				isdrink: false,
				isveggie: false,
				isvegan: false
			}, {
				name: 'Bread',
				price: 2,
				amountofsides: 0,
				isside: true,
				sideprice: 1,
				isdrink: false,
				isveggie: false,
				isvegan: false
			}
		];

		//LIST OF DRINKS
		$scope.drink = function() {
			var drinks = [];
			angular.forEach($scope.menuitems, function(m) {
				if (m.isdrink) {
					drinks.push(m);
				}
			});
			return drinks;
		};

		$scope.drinks = $scope.drink();

		//LIST OF FOOD
		$scope.grub = function() {
			var food = [];
			angular.forEach($scope.menuitems, function(m) {
				if (!m.isdrink) {
					food.push(m);
				}
			});
			return food;
		};

		$scope.food = $scope.grub();

		//LIST OF SIDES
		$scope.side = function() {
			var side = [];
			angular.forEach($scope.menuitems, function(m) {
				if (m.isside) {
					side.push(m);
				}
			});
			return side;
		};

		$scope.sides = $scope.side();

		//LIST OF CURRENT ORDER
		$scope.order = [];

		//VALUE FOR NG-HIDE SIDE-DISH SELECTOR DIV
		$scope.addside = true;

		//ADD PRODUCT TO ORDER
		$scope.addOne = function(m) {
			var order = {name: m.name, price: m.price};
			$scope.order.push(order);

			if (m.amountofsides > 0) {
				$scope.addside = false;
			}
		};

		//ADD SIDE-DISH TO MEAL ORDER
		$scope.addOneSide = function(m) {
			var order= {name: m.name, price: m.sideprice};
			$scope.order.push(order);
		}

		//REMOVE PRODUCT FROM ORDER
		$scope.removeOne = function(m) {
			for (var i = 0; i < $scope.order.length; i++) {
				if ($scope.order[i].name === m.name) {
					$scope.order.splice(i, 1);
					break;
				}
			}
		};

		//TOTAL PRICE OF ORDER
		$scope.total = function() {
			var total = 0;
			angular.forEach($scope.order, function(m) {
				total += m.price;
			});
			return total;
		};

		// TOTAL QUANTITY OF ORDER
		$scope.totalq = function() {
			var totalq = 0;
			angular.forEach($scope.order, function() {
				totalq = totalq + 1;
			});
			return totalq;
		};

		$scope.send = function() {
			shareOrder.sendOrder($scope.order);
		}
		/*
		$scope.send = function() {
			dataShare.sendData($scope.order);
			$location.path('/bill');
		};
		*/


	}]);


