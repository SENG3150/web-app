//Controller to show all machines that are in the system.
angular
	.module('joy-global')
	.controller('DomainExpertMachinesControllerIndex', ['$scope', '$state', 'Machines', 'LayoutService', 'DataTablesService', function ($scope, $state, Machines, LayoutService, DataTablesService) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Machines']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Machine</button>');
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

		//get the information about all machines in the system
		Machines.getList({include: 'model.majorAssemblies.subAssemblies'}).then(function (data) {
			$scope.loading = false;
			$scope.machines = data;
		});

		$scope.dtOptions = DataTablesService.prepare('Machines');

		LayoutService.getPageHeader().onClicked(function () {
			$state.go('domainExpert-machines-create');
		});
	}]);