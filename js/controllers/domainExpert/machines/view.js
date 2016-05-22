angular
	.module('joy-global')
	.controller('DomainExpertMachinesControllerView', ['$scope', 'Inspections', 'Machines', '$stateParams', 'LayoutService', function ($scope, Inspections, Machines, $stateParams, LayoutService) {
		$scope.inspections = Inspections.getList({include: 'machine'}).$object;
		//$scope.machines = Machines.getList({include: 'model.majorAssemblies.subAssemblies'}).$object;
		$scope.machineId = $stateParams.id;
		$scope.machine = Machines.one($scope.machineId).get({include: 'model.majorAssemblies.subAssemblies'}).$object;

		LayoutService.reset();
		LayoutService.setTitle(['Machine ' + $scope.machineId, 'Machines']);
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-machines-index',
				displayName: 'Machines'
			},
			{
				route: 'domainExpert-machines-view({ id: ' + $scope.machineId + ' })',
				displayName: 'Machine ' + $scope.machineId
			}
		]);
	}]);