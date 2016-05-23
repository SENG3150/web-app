angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerIndex', ['$scope', 'Inspections', 'moment', 'LayoutService', 'DataTablesService', function ($scope, Inspections, moment, LayoutService, DataTablesService) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Inspections']);
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

		Inspections.getList({ include: 'machine.model,technician,scheduler' }).then(function (data) {
			$scope.loading = false;
			$scope.inspections = data;
		});

		$scope.moment = moment;
		$scope.dtOptions = DataTablesService.prepare('Inspections');
	}]);