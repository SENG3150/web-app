angular
	.module('joy-global')
	.controller('DomainExpertIndexControllerIndex', ['$scope', 'LayoutService', function ($scope, LayoutService) {
		LayoutService.reset();
		LayoutService.setTitle(['Home']);
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			}
		]);
	}]);