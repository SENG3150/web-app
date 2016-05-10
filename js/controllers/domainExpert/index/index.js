angular
	.module('joy-global')
	.controller('DomainExpertIndexControllerIndex', ['$scope', 'AuthService', 'Inspections', 'moment', function ($scope, AuthService, Inspections, moment) {
		$scope.user = AuthService.getUser();

		$scope.inspections = Inspections.getList().$object;

		$scope.moment = moment;
	}]);