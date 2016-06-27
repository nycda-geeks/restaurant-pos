angular.module('restaurantPOS')
	.controller('newOrderController', ['$scope', '$http','$location', function($scope, $http, $location) {

		//TABLE NUMBER FROM URL
		$scope.params = $location.path().split('/')[3] || "Unknown";

		//GET MENU 
		$http.get('/v1/menu').then(function(res) {
			$scope.menuitems = res.data;
		});

		//SEND ORDER
		$scope.sendOrder = function() {
			var data = $scope.order;
			/*
			$http.post('/v1/tables/' + $scope.params, data).success(function(data, status) {
				
			});*/
 
			$http({
			    method: 'POST',
			    url: '/v1/tables/' + $scope.params,
			    data: data
			}).success(function () {});
		};

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

		console.log($scope.order);
		//VALUE FOR NG-HIDE SIDE-DISH SELECTOR DIV
		$scope.addside = true;

		//ADD PRODUCT TO ORDER
		$scope.addOne = function(m) {
			var order = {name: m.name, price: m.price, menuitemId: m.id};
			
			if (m.amountofsides > 0) {
				order.amountofsides = m.amountofsides;
				order.sides = []
				$scope.addside = false;
				$scope.order.push(order);
			} else {
				$scope.order.push(order);
			}

		};

		//ADD SIDE-DISH TO MEAL ORDER
		$scope.addOneSide = function(m) {
			var sideorder = {name: m.name, price: m.sideprice, menuitemId: m.id};

			if ($scope.order[$scope.order.length - 1].sides.length < $scope.order[$scope.order.length - 1].amountofsides) {
				$scope.order[$scope.order.length - 1].sides.push(sideorder);
			}
			
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

		//REMOVE SIDE-DISH FROM MEAL ORDER
		$scope.removeOneSide = function(m) {
			$scope.order[$scope.order.length - 1].sides.pop();
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

		var indexedFood = [];

		$scope.foodToFilter = function() {
			indexedFood = [];
			return $scope.food;
		}

		$scope.filterCategories = function(food) {
			var categoryNew = indexedFood.indexOf(food.category) == -1;
			if (categoryNew) {
				indexedFood.push(food.category);
			}
			return categoryNew;
		}

		$scope.message = "Your Order Was Placed!";

		/*
		$scope.send = function() {
			dataShare.sendData($scope.order);
			$location.path('/bill');
		};

				$scope.send = function() {
			shareOrder.sendOrder($scope.order);
		};
		*/


	}]);


