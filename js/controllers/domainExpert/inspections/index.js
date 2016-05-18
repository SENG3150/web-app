angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerIndex', ['$scope', 'Inspections', 'moment', 'LayoutService', function ($scope, Inspections, moment, LayoutService) {
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

		$scope.inspections = Inspections.getList().$object;

		$scope.moment = moment;
	}]);