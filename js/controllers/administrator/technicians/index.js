angular
	.module('joy-global')
	.controller('AdministratorTechniciansControllerIndex', ['$scope', 'Technicians', 'LayoutService',  '$state', 'DataTablesService',  function ($scope, Technicians, LayoutService, $state, DataTablesService) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Technicians']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Technician</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			},
			{
				route: 'administrator-technicians-index',
				displayName: 'Technicians'
			}
		]);

		Technicians.getList().then(function (data) {
			$scope.loading = false;
			$scope.technicians = data;
		});

		$scope.goTo = function() {
			$state.go('administrator-technicians-create');
		};

		LayoutService.getPageHeader().onClicked($scope.goTo);

		$scope.dtOptions = DataTablesService.prepare('Technicians');
	}]);