//set up the different available routes a domain expert can take in regards to machines
angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('domainExpert-machines-index', {
				parent: 'domainExpert',
				url: '/machines',
				templateUrl: 'views/domainExpert/machines/index.html',
				controller: 'DomainExpertMachinesControllerIndex',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables'])
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert-machines-create', {
				parent: 'domainExpert',
				url: '/machines/create',
				templateUrl: 'views/domainExpert/machines/create.html',
				controller: 'DomainExpertMachinesControllerCreate',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert-machines-view', {
				parent: 'domainExpert',
				url: '/machines/:id',
				templateUrl: 'views/domainExpert/machines/view.html',
				controller: 'DomainExpertMachinesControllerView',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables'])
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);