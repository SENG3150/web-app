angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerCreate',  ['$scope', 'Inspections', 'Machines', 'Technicians', '$stateParams', function ($scope, Inspections, Machines, Technicians, $stateParams) {
		$scope.inspections = Inspections.getList({include: 'machine'}).$object;
		$scope.machineId = $stateParams.id;
		$scope.machine = Machines.one($scope.machineId).get({include: 'model.majorAssemblies.subAssemblies.tests'}).$object;
		$scope.technicians = Technicians.getList().$object;
	}]);