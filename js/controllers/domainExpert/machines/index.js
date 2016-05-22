angular
	.module('joy-global')
	.controller('DomainExpertMachinesControllerIndex', ['$scope', 'Inspections', 'Machines', 'LayoutService', function ($scope, Inspections, Machines, LayoutService) {
		LayoutService.reset();
		LayoutService.setTitle(['Machines']);
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-machines-index',
				displayName: 'Machines'
			}
		]);

		$scope.inspections = Inspections.getList({include: 'machine'}).$object;
		$scope.machines = Machines.getList({include: 'model.majorAssemblies.subAssemblies'}).$object;
	}]);