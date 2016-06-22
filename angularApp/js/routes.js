angular.module('routes', ["ui.router"])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
		function($stateProvider, $urlRouterProvider, $locationProvider) {
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl:'/app/views/waiter.html',
					controller: 'WaiterController'
				})
				.state('order', {
					url: '/order',
					templateUrl:'/app/views/newOrder.html',
					controller: 'newOrderController',
				})
				.state('order.sides', {
					url: '/sides',
					templateUrl:'/app/views/sides.html',
					controller: 'newOrderController'
				})
				.state('bill', {
					url: '/bill',
					templateUrl: '/app/views/bill.html',
					controller: 'billController'
				})
				.state('kitchen', {
					url:'/kitchen',
					templateUrl: '/app/views/kitchen.html',
					controller: 'kitchenController'
				})
				.state('login', {
					url:'/login',
					templateUrl: '/app/views/login.html'
				})
				.state('register', {
					url:'/',
					templateUrl: '/app/views/register.html'
				})

			$locationProvider.html5Mode(true);
}])


/*
	.factory('shareOrder', function() {
		var list = [];

		return {
			sendOrder: sendOrder,
			getOrder: getOrder
		};

		function sendOrder(order) {
			angular.forEach(order, function(m) {
				list.push(m);
			});
		}

		function getOrder() {
			return list;
		}
	})
	.factory('dataShare', function($rootScope, $timeout) {
		var service = [];
		service.data = false;
		service.sendData = function(data){
			this.data = data;
			$timeout(function() {
				$rootScope.$broadcast('data_shared');
			}, 100);
			
		};
		service.getData = function(){
			return this.data;
		};
		return service;
	});*/

	/*
				.state('home', {
					url: '/',
					templateUrl:'views/login.html',
					controller: 'MainController'
				})
				.state('newOrder.drinks', {
					url: '/drinks',
					templateUrl: '/public/views/newOrder.drinks.html',
					controller: 'DrinksController'
				})
				.state('newOrder.food', {
					url: '/food',
					templateUrl: '/public/views/newOrder.food.html',
					controller: 'FoodController'
				})
				.state('waiter', {
					url: '/waiter',
					templateUrl:'views/waiter.html',
					controller: 'WaiterController'
				})
				.state('waiter.newOrder', {
					url: '/newOrder',
					templateUrl: 'views/newOrder.html',
					controller: 'NewOrderController'
				})
				.state('newOrder.drinks', {
					url: '/drinks',
					templateUrl: 'views/newOrder.drinks.html',
					controller: 'DrinksController'
				})
				.state('newOrder.food', {
					url: '/food',
					templateUrl: 'views/newOrder.food.html',
					controller: 'FoodController'
				})
					.state('order', {
					url: '/',
					templateUrl:'/public/views/newOrder.html',
					controller: 'newOrderController',
					views: {
						'': {templateUrl: '/public/views/newOrder.html'},
						'drinks@order': {
							templateUrl: '/public/views/newOrder.drinks.html',
							controller: 'DrinksController'
						},
						'food@order': {
							templateUrl: '/public/views/newOrder.food.html',
							controller: 'FoodController'
						}
					}
				})

				*/