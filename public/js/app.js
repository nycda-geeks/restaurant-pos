angular.module('restaurantPOS', ['ui.router', 'usermgmt.services'])
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
					.state('verify', {
						url: '/register/verify/:userid',
						templateUrl:'/views/verify.html',
						controller: 'MainController'
					})
					.state('user-list', {
						url: '/user-list',
						templateUrl:'/views/user-list.html',
						controller: 'UserListCtrl'
					})
					.state('user-detail', {
						url: '/user-detail/:id',
						templateUrl:'/views/user-detail.html',
						controller: 'UserDetailCtrl'
					})
					.state('user-creation', {
						url: '/user-creation',
						templateUrl:'/views/user-creation.html',
						controller: 'UserCreationCtrl'
					})
					.state('menu-editor', {
						url: '/menu-editor',
						templateUrl:'/views/menu-editor.html',
						controller: 'menuEditor'
					})
				$locationProvider.html5Mode(true);
	}])
