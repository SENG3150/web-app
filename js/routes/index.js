angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('index', {
				url: '/',
				controller: ['$state', 'AuthService', function ($state, AuthService) {
					if (AuthService.getUser() != null && AuthService.getUser().type != null) {
						$state.go(AuthService.getUser().type + '-index');
					} else {
						$state.go('auth.login');
					}
				}],
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('administrator', {
				abstract: true,
				url: '/administrator',
				templateUrl: 'views/layouts/default.html',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert', {
				abstract: true,
				url: '/domainExpert',
				templateUrl: 'views/layouts/default.html',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}])
	.run(['$rootScope', '$state', '$auth', '$window', function ($rootScope, $state, $auth, $window) {
		$rootScope.$on('$stateChangeError',
			function (event) {
				event.preventDefault();

				$state.go('auth.login', {r: $window.location.href});
			});

		$rootScope.$state = $state;
	}]);