//Controller for allowing of viewing of all inspections
angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerIndex', ['$scope', 'Inspections', 'moment', 'LayoutService', 'DataTablesService', '$state', function ($scope, Inspections, moment, LayoutService, DataTablesService, $state) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Inspections']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-calendar-plus-o"></i> Schedule Inspection</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-inspections-index',
				displayName: 'Inspections'
			}
		]);

		//get a list of all inspections that are in the system
		Inspections.getList({include: 'machine.model,technician,scheduler'}).then(function (data) {
			$scope.loading = false;
			$scope.inspections = data;
		});

		$scope.moment = moment;
		$scope.dtOptions = DataTablesService.prepare('Inspections');

		LayoutService.getPageHeader().onClicked(function () {
			$state.go('domainExpert-inspections-create')
		});
	}]);