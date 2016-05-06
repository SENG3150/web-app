angular
	.module('joy-global')
	.controller('TechnicianIndexControllerIndex', ['$scope', 'AuthService', function ($scope, AuthService) {
		$scope.user = AuthService.getUser();
	}]);