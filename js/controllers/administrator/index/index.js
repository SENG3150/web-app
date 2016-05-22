angular
	.module('joy-global')
	.controller('AdministratorIndexControllerIndex', ['$scope', 'LayoutService', function ($scope, LayoutService) {
		LayoutService.reset();
		LayoutService.setTitle(['Home']);
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			}
		]);
	}]);