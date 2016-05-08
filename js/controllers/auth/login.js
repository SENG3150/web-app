angular
	.module('joy-global')
	.controller('AuthControllerLogin', ['$scope', 'AuthService', '$state', '$stateParams', '$window', 'toastr', function ($scope, AuthService, $state, $stateParams, $window, toastr) {
		$scope.username = '';
		$scope.password = '';
		$scope.type = 'domainExpert';

		if (AuthService.getUser()) {
			$scope.username = AuthService.getUser().primary.username;
			$scope.type = AuthService.getUser().type;
		}

		$scope.changeType = function (type) {
			$scope.type = type;
		};

		$scope.login = function () {
			if ($scope.validate() == true) {
				toastr.info('Attempting to login.');
				var credentials = {
					username: $scope.username,
					password: $scope.password,
					type: $scope.type
				};

				AuthService
					.authenticate(credentials)
					.then(
						function (user) {
							toastr.clear();
							toastr.success('Welcome to Joy Global.');

							if ($stateParams.r) {
								$window.location.href = $stateParams.r;
							} else {
								$state.go('index');
							}
						},
						function () {
							toastr.clear();
							toastr.error('Your credentials were incorrect.', 'Error');
						},
						function () {
							toastr.clear();
							toastr.info('Loading your account information now...', 'You were logged in successfully.');
						}
					);
			}

			return false;
		};

		$scope.validate = function () {
			if ($scope.username == '' || $scope.username == null) {
				toastr.clear();
				toastr.error('You must provide your Username.', 'Error');

				return false;
			}

			if ($scope.password == '') {
				toastr.clear();
				toastr.warning('You must provide your Password.', 'Error');

				return false;
			}

			return true;
		};
	}]);