angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerView', ['$scope', '$state', 'toastr', 'Administrators', '$stateParams', 'LayoutService', function ($scope, $state, toastr , Administrators, $stateParams, LayoutService) {
		$scope.administratorId = $stateParams.id;
		$scope.loading = true;
		var oldPassword = '';



		Administrators.one($scope.administratorId).get().then(
			function(data) {
				oldPassword = data.password;
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



			return true;
		};

		$scope.save = function() {
			if ($scope.validate() == true) {

				var administrator = {
					username: $scope.administrator.username,
					email: $scope.administrator.email,
					firstName: $scope.administrator.firstName,
					lastName: $scope.administrator.lastName,
					password: 'test',
					confirmPassword: 'test'

				};
				toastr.error('username:'+administrator.username);
				toastr.error('email:'+administrator.email);
				toastr.error('firstName:'+administrator.firstName);
				toastr.error('lastName:'+administrator.lastName);
				toastr.error('password:'+administrator.password);
				toastr.error('confirmPassword:'+administrator.confirmPassword);
				toastr.error('password:'+$scope.administrator.password);
				toastr.error('confirmPassword:'+$scope.administrator.confirmPassword);
				toastr.error('old password:'+oldPassword);

				if($scope.administrator.password != '') {
					administrator.password = 'test';
				}
				if($scope.administrator.confirmPassword != '') {
					administrator.confirmPassword = 'test';
				}

				Administrators.post(administrator)
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