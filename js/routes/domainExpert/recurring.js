//set up the different available routes a domain expert can take in regards to inspections
angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('domainExpert-recurring-index', {
				parent: 'domainExpert',
				url: '/recurring',
				templateUrl: 'views/domainExpert/recurring/index.html',
				controller: 'DomainExpertRecurringControllerIndex',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables']);
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert-recurring-create', {
				parent: 'domainExpert',
				url: '/recurring/create',
				templateUrl: 'views/domainExpert/recurring/create.html',
				controller: 'DomainExpertRecurringControllerCreate',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables']);
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert-recurring-view', {
				parent: 'domainExpert',
				url: '/recurring/:id',
				templateUrl: 'views/domainExpert/recurring/view.html',
				controller: 'DomainExpertRecurringControllerView',
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