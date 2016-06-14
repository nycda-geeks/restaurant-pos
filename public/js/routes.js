angular.module('appRoutes', ["ui.router"])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
		function($stateProvider, $urlRouterProvider, $locationProvider) {
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl:'views/login.html',
					controller: 'MainController'
				}),
				.state('waiter', {
					url: '/waiter',
					templateUrl:'views/waiter.html',
					controller: 'WaiterController'
				}),
				.when('waiter.newOrder', {
					url: '/newOrder'
					templateUrl: 'views/newOrder.html',
					controller: 'NewOrderController'
				})
				.when('newOrder.drinks', {
					url: '/drinks'
					templateUrl: 'views/newOrder.drinks.html',
					controller: 'DrinksController'
				}),
				.when('/waiter/food', {
					templateUrl: 'views/newOrder.food.html',
					controller: 'FoodController'
				})

			$locationProvider.html5Mode(true);
}]);