angular.module('restaurantPOS')
	.controller('MainController', ['$scope', '$http', function($scope, $http) {
		$scope.register = function() {
			$http.post('/')
		}
	}])
	.controller('UserListCtrl', ['$scope', 'UsersFactory', 'UserFactory', '$location',
		function ($scope, UsersFactory, UserFactory, $location) {
			// callback for ng-click 'editUser':
			$scope.editUser = function (userId) {
				$location.path('/user-detail/' + userId);
			};

			// callback for ng-click 'deleteUser':
			$scope.deleteUser = function (userId) {
				UserFactory.delete({ id: userId });
				$scope.users = UsersFactory.query();
			};

			// callback for ng-click 'createUser':
			$scope.createNewUser = function () {
				$location.path('/user-creation');
			};

			$scope.users = UsersFactory.query();
	}])
	.controller('UserDetailCtrl', ['$scope', '$stateParams', 'UserFactory', '$location',
	function ($scope, $stateParams, UserFactory, $location) {
        // callback for ng-click 'updateUser':
        $scope.updateUser = function () {
        	UserFactory.update($scope.user);
        	$location.path('/user-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
        	$location.path('/user-list');
        };

        $scope.user = UserFactory.show({id: $stateParams.id});
    }])
    .controller('UserCreationCtrl', ['$scope', 'UsersFactory', 'RolesFactory', '$location',
    function ($scope, UsersFactory, RolesFactory, $location) {
    	$scope.roles = RolesFactory.query();

        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            UsersFactory.create($scope.user);
            $location.path('/user-list');
        }
    }]);