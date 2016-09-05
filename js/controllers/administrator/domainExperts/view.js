//Controller to allow administrator to view and update a domain experts details.
angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerView', ['$scope', '$state', 'toastr', 'DomainExperts', '$stateParams', 'LayoutService', function ($scope ,$state, toastr, DomainExperts, $stateParams, LayoutService) {
		$scope.domainExpertsId = $stateParams.id;
		$scope.loading = true;

		$scope.password = '';
		$scope.confirmPassword = '';

		//Get the information for a domain expert by ID
		DomainExperts.one($scope.domainExpertsId).get().then(
			function(data) {
				$scope.loading = false;
				$scope.domainExpert = data;

				LayoutService.setTitle([$scope.domainExpert.name, 'DomainExperts']);
				LayoutService.getPageHeader().setBreadcrumbs([
					{
						route: 'administrator-index',
						displayName: 'Home'
					},
					{
						route: 'administrator-domainExperts-index',
						displayName: 'Domain Experts'
					},
					{
						route: 'administrator-domainExperts-view',
						displayName: $scope.domainExpert.name
					}
				]);
			});

		LayoutService.reset();
		LayoutService.setTitle(['DomainExpert', 'DomainExperts']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			},
			{
				route: 'administrator-domainExperts-index',
				displayName: 'Domain Experts'
			},
			{
				route: 'administrator-domainExperts-view',
				displayName: 'Domain Expert'
			}
		]);

		//Validate all entered data before submitting to the server
		$scope.validate = function () {
			if ($scope.domainExpert.username == '' || $scope.domainExpert.username == null) {
				toastr.clear();
				toastr.error('Enter user name.');

				return false;
			}

			if ($scope.domainExpert.firstName == '' || $scope.domainExpert.firstName == null) {
				toastr.clear();
				toastr.error('Enter first name.');

				return false;
			}

			if ($scope.domainExpert.lastName == '' || $scope.domainExpert.lastName == null) {
				toastr.clear();
				toastr.error('Enter last name.');

				return false;
			}

			if ($scope.domainExpert.email == '' || $scope.domainExpert.email == null) {
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

		//If user data is edited the new data is validated and then saved to the server
		$scope.save = function () {
			if ($scope.validate() == true) {
				if ($scope.password != '') {
					$scope.domainExpert.password = $scope.password;
				} else {
					if ($scope.domainExpert.password) {
						delete $scope.domainExpert.password;
					}
				}

				$scope.domainExpert.post()
					.then(function () {
						toastr.clear();
						toastr.success('User was updated successfully.');

						$state.go('administrator-domainExperts-index');
					}, function () {
						toastr.clear();
						toastr.error('There was an error updating the user.');
					});

			}
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);