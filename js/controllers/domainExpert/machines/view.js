angular
	.module('joy-global')
	.controller('DomainExpertMachinesControllerView', ['$scope', 'Inspections', 'Machines', function ($scope, Inspections, Machines) {
		$scope.inspections = Inspections.getList({include: 'machine'}).$object;
		$scope.machines = Machines.getList({include: 'model.majorAssemblies.subAssemblies'}).$object;
	}]);