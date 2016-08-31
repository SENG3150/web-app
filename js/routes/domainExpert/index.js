angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('domainExpert-index', {
				parent: 'domainExpert',
				url: '/',
				templateUrl: 'views/domainExpert/index/index.html',
				controller: 'DomainExpertIndexControllerIndex',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables']);
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);