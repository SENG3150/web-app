//set up the different available routes an administrator can take to manage different domain expert users
angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('administrator-domainExperts-index', {
				parent: 'administrator',
				url: '/domainExperts',
				templateUrl: 'views/administrator/domainExperts/index.html',
				controller: 'AdministratorDomainExpertsControllerIndex',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables'])
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('administrator-domainExperts-create', {
				parent: 'administrator',
				url: '/domainExperts/create',
				templateUrl: 'views/administrator/domainExperts/create.html',
				controller: 'AdministratorDomainExpertsControllerCreate',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('administrator-domainExperts-view', {
				parent: 'administrator',
				url: '/domainExperts/:id',
				templateUrl: 'views/administrator/domainExperts/view.html',
				controller: 'AdministratorDomainExpertsControllerView',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);