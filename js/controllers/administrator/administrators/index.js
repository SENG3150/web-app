//Controller to shows a list of all current administrators in the system
angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerIndex', ['$scope', 'Administrators', 'LayoutService', '$state', 'DataTablesService', function ($scope, Administrators, LayoutService, $state, DataTablesService) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Administrators']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Administrator</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			},
			{
				route: 'administrator-administrators-index',
				displayName: 'Administrators'
			}
		]);

		Administrators.getList().then(function (data) {
			$scope.loading = false;
			$scope.administrators = data;
		});

		$scope.goTo = function () {
			$state.go('administrator-administrators-create');
		};

		LayoutService.getPageHeader().onClicked($scope.goTo);

		$scope.dtOptions = DataTablesService.prepare('Administrators');
	}]);
