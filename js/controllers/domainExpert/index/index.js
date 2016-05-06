angular
	.module('joy-global')
	.controller('DomainExpertIndexControllerIndex', ['$scope', 'AuthService', function ($scope, AuthService) {
		$scope.user = AuthService.getUser();
	}]);