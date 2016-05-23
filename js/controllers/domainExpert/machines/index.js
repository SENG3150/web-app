angular
	.module('joy-global')
	.controller('DomainExpertMachinesControllerIndex', ['$scope', 'Machines', 'LayoutService', 'DataTablesService', function ($scope, Machines, LayoutService, DataTablesService) {
		$scope.loading = true;

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

		Machines.getList({include: 'model.majorAssemblies.subAssemblies'}).then(function (data) {
			$scope.loading = false;
			$scope.machines = data;
		});

		$scope.dtOptions = DataTablesService.prepare('Machines');
	}]);