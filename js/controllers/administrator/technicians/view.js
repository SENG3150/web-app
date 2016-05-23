angular
	.module('joy-global')
	.controller('AdministratorTechniciansControllerView', ['$scope', 'Technicians', '$stateParams', 'LayoutService', 'moment', function ($scope, Technicians, $stateParams, LayoutService, moment) {
		$scope.technicianId = $stateParams.id;
		$scope.loading = true;

		Technicians.one($scope.technicianId).get().then(
			function(data) {
				$scope.loading = false;
				$scope.technician = data;

				LayoutService.setTitle([$scope.technician.name, 'Technicians']);
				LayoutService.getPageHeader().setBreadcrumbs([
					{
						route: 'administrator-index',
						displayName: 'Home'
					},
					{
						route: 'administrator-technicians-index',
						displayName: 'Technicians'
					},
					{
						route: 'administrator-technicians-view',
						displayName: $scope.technician.name
					}
				]);
			});

		LayoutService.reset();
		LayoutService.setTitle(['Technician', 'Technicians']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			},
			{
				route: 'administrator-technicians-index',
				displayName: 'Technicians'
			},
			{
				route: 'administrator-technicians-view',
				displayName: 'Technician'
			}
		]);

		$scope.save = function() {
			console.log('Update this code to save it.');
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);
