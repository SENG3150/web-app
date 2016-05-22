angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerCreate', ['$scope', 'toastr', 'LayoutService', function ($scope, toastr, LayoutService) {
		$scope.newUserData = {};

		LayoutService.reset();
		LayoutService.setTitle(['Create New Domain Expert']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');

		$scope.submitUser = function() {
			if($scope.validate() == true) {
				console.log($scope.newUserData);
			};
		};

		$scope.validate = function() {
			if($scope.newUserData.firstname == "" || $scope.newUserData.firstname == null) {
				toastr.clear();
				toastr.error("Enter First name");

				return false;
			}
			if($scope.newUserData.lastname == "" || $scope.newUserData.lastname == null) {
				toastr.clear();
				toastr.error("Enter Last name");

				return false;
			}
			if($scope.newUserData.email == "" || $scope.newUserData.email == null) {
				toastr.clear();
				toastr.error("Enter a valid email address");

				return false;
			}
			if($scope.newUserData.password == "" || $scope.newUserData.password == null) {
				toastr.clear();
				toastr.error("Enter a password");

				return false;
			}
			return true;
		}

		LayoutService.getPageHeader().onClicked($scope.submitUser);
	}]);