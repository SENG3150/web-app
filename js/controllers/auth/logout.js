angular
	.module('joy-global')
	.controller('AuthControllerLogout', ['$auth', '$state', 'toastr', function ($auth, $state, toastr) {
		$auth.logout().then(function () {
			toastr.success('You were logged out successfully.');
			$state.go('auth.login');
		});
	}]);