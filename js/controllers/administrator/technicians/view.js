angular
	.module('joy-global')
	.controller('AdministratorTechniciansControllerView', ['$scope', '$state', 'toastr', 'Technicians', '$stateParams', 'LayoutService', 'moment', function ($scope, $state, toastr, Technicians, $stateParams, LayoutService, moment) {
		$scope.technicianId = $stateParams.id;
		$scope.loading = true;

		$scope.password = '';
		$scope.confirmPassword = '';

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

		$scope.validate = function () {
			if ($scope.technician.username == '' || $scope.technician.username == null) {
				toastr.clear();
				toastr.error('Enter user name.');

				return false;
			}

			if ($scope.technician.firstName == '' || $scope.technician.firstName == null) {
				toastr.clear();
				toastr.error('Enter first name.');

				return false;
			}

			if ($scope.technician.lastName == '' || $scope.technician.lastName == null) {
				toastr.clear();
				toastr.error('Enter last name.');

				return false;
			}

			if ($scope.technician.email == '' || $scope.technician.email == null) {
				toastr.clear();
				toastr.error('Enter a valid email address.');

				return false;
			}

			if ($scope.password != $scope.confirmPassword) {
				toastr.clear();
				toastr.error('Passwords must match.');

				return false;
			}

			if ($scope.technician.temporary == true) {
				if ($scope.technician.loginExpiresTime == '' || $scope.technician.loginExpiresTime == null) {
					toastr.clear();
					toastr.error('Enter a date.');

					return false;
				}
			}

			return true;
		};

		$scope.save = function () {
			if ($scope.validate() == true) {
				if ($scope.password != '') {
					$scope.technician.password = $scope.password;
				} else {
					if ($scope.technician.password) {
						delete $scope.technician.password;
					}
				}

				$scope.technician.post()
					.then(function () {
						toastr.clear();
						toastr.success('User was updated successfully.');

						$state.go('administrator-technicians-index');
					}, function () {
						toastr.clear();
						toastr.error('There was an error updating the user.');
					});

			}
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);
