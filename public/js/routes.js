angular.module('appRoutes', [])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl:'views/login.html',
				controller: 'MainController'
			}),
			.when('/waiter', {
				templateUrl:'views/waiter.html',
				controller: 'WaiterController'
			}),
			.when('/waiter/table', {
				templateUrl: 'views/table.html',
				controller: 'TableController'
			})
			.when('/waiter/drinks', {
				templateUrl: 'views/drinks.html',
				controller: 'DrinksController'
			}),
			.when('/waiter/food', {
				templateUrl: 'views/food.html',
				controller: 'FoodController'
			})

		$locationProvider.html5Mode(true);
}]);