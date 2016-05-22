angular
	.module('joy-global')
	.controller('AdministratorIndexControllerIndex', ['$scope', 'LayoutService', function ($scope, LayoutService) {
		LayoutService.reset();
	}]);