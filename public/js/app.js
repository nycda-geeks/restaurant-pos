angular.module('restaurantPOS', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('home', {
						url: '/',
						templateUrl:'/public/views/landingpage.html',
						controller: 'MainController'
					})
					.state('register', {
						url: '/register',
						templateUrl:'/public/views/register.html',
						controller: 'MainController',
					})
					.state('login', {
						url: '/login',
						templateUrl:'/public/views/login.html',
						controller: 'MainController'
					})

				$locationProvider.html5Mode(true);
	}])