angular
	.module('joy-global')
	.controller('DomainExpertIndexControllerIndex', ['$scope', 'AuthService', 'Inspections', function ($scope, AuthService, Inspections) {
		$scope.user = AuthService.getUser();

		$scope.inspections = Inspections.getList().$object;
	}]);