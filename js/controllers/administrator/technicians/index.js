angular
	.module('joy-global')
	.controller('AdministratorTechniciansControllerIndex', ['$scope', 'Technicians', function ($scope, Technicians) {
		$scope.technicians = Technicians.getList().$object;
	}]);