angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('auth', {
				abstract: true,
				url: '/auth',
				templateUrl: 'views/layouts/plain.html',
				data: {
					specialClass: 'gray-bg'
				}
			})
			.state('auth.login', {
				parent: 'auth',
				url: '/login?r',
				templateUrl: 'views/auth/login.html',
				controller: 'AuthControllerLogin'
			})
			.state('auth.logout', {
				parent: 'auth',
				url: '/logout',
				controller: 'AuthControllerLogout'
			});
	}]);