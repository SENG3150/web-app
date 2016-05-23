angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerView', ['$scope', 'Administrators', '$stateParams', 'LayoutService', 'moment', function ($scope, Administrators, $stateParams, LayoutService, moment) {
		$scope.administratorId = $stateParams.id;
		$scope.loading = true;

		Administrators.one($scope.administratorId).get().then(
			function(data) {
				$scope.loading = false;
				$scope.administrator = data;

				LayoutService.setTitle([$scope.administrator.name, 'Administrators']);
				LayoutService.getPageHeader().setBreadcrumbs([
					{
						route: 'administrator-index',
						displayName: 'Home'
					},
					{
						route: 'administrator-administrators-index',
						displayName: 'Administrators'
					},
					{
						route: 'administrator-administrators-view',
						displayName: $scope.administrator.name
					}
				]);
			});

		LayoutService.reset();
		LayoutService.setTitle(['Administrator', 'Administrators']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			},
			{
				route: 'administrator-administrators-index',
				displayName: 'Administrators'
			},
			{
				route: 'administrator-administrators-view',
				displayName: 'Administrator'
			}
		]);

		$scope.save = function() {
			console.log('Update this code to save it.');
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);