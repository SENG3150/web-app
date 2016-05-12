angular
	.module('joy-global')
	.controller('DomainExpertMachinesControllerView', ['$scope', 'Inspections', 'Machines', '$stateParams', function ($scope, Inspections, Machines, $stateParams) {
		$scope.inspections = Inspections.getList({include: 'machine'}).$object;
		//$scope.machines = Machines.getList({include: 'model.majorAssemblies.subAssemblies'}).$object;
		$scope.machineId = $stateParams.id;
		$scope.machine = Machines.one($scope.machineId).get({include: 'model.majorAssemblies.subAssemblies'}).$object;
	}]);