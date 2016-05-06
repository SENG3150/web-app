angular
	.module('joy-global')
	.controller('AdministratorIndexControllerIndex', ['$scope', 'AuthService', function ($scope, AuthService) {
		$scope.user = AuthService.getUser();
	}]);