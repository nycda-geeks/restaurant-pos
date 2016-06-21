angular.module('restaurantPOS', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('home', {
						url: '/',
						templateUrl:'/views/landingpage.html',
						controller: 'MainController'
					})
					.state('register', {
						url: '/register',
						templateUrl:'/views/register.html',
						controller: 'MainController',
					})
					.state('login', {
						url: '/login',
						templateUrl:'/views/login.html',
						controller: 'MainController'
					})

				$locationProvider.html5Mode(true);
	}])