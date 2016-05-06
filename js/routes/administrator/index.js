angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('administrator-index', {
				parent: 'administrator',
				url: '/',
				templateUrl: 'views/administrator/index/index.html',
				controller: 'AdministratorIndexControllerIndex',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);