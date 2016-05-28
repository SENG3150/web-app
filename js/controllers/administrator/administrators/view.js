//Controller to allow administrator to view and update an administrators details.
angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerView', ['$scope', '$state', 'toastr', 'Administrators', '$stateParams', 'LayoutService', function ($scope, $state, toastr, Administrators, $stateParams, LayoutService) {
		$scope.administratorId = $stateParams.id;
		$scope.loading = true;

		$scope.password = '';
		$scope.confirmPassword = '';

		Administrators.one($scope.administratorId).get().then(
			function (data) {
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

		$scope.validate = function () {
			if ($scope.administrator.username == '' || $scope.administrator.username == null) {
				toastr.clear();
				toastr.error('Enter user name.');

				return false;
			}

			if ($scope.administrator.firstName == '' || $scope.administrator.firstName == null) {
				toastr.clear();
				toastr.error('Enter first name.');

				return false;
			}

			if ($scope.administrator.lastName == '' || $scope.administrator.lastName == null) {
				toastr.clear();
				toastr.error('Enter last name.');

				return false;
			}

			if ($scope.administrator.email == '' || $scope.administrator.email == null) {
				toastr.clear();
				toastr.error('Enter a valid email address.');

				return false;
			}

			if ($scope.password != $scope.confirmPassword) {
				toastr.clear();
				toastr.error('Passwords must match.');

				return false;
			}

			return true;
		};

		$scope.save = function () {
			if ($scope.validate() == true) {
				if ($scope.password != '') {
					$scope.administrator.password = $scope.password;
				} else {
					if ($scope.administrator.password) {
						delete $scope.administrator.password;
					}
				}

				$scope.administrator.post()
					.then(function () {
						toastr.clear();
						toastr.success('User was updated successfully.');

						$state.go('administrator-administrators-index');
					}, function () {
						toastr.clear();
						toastr.error('There was an error updating the user.');
					});

			}
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);