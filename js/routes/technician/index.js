angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('technician-index', {
				parent: 'technician',
				url: '/',
				templateUrl: 'views/technician/index/index.html',
				controller: 'TechnicianIndexControllerIndex',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);