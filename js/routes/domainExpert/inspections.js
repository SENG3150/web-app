//set up the different available routes a domain expert can take in regards to inspections
angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('domainExpert-inspections-index', {
				parent: 'domainExpert',
				url: '/inspections',
				templateUrl: 'views/domainExpert/inspections/index.html',
				controller: 'DomainExpertInspectionsControllerIndex',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables']);
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert-inspections-create', {
				parent: 'domainExpert',
				url: '/inspections/create',
				templateUrl: 'views/domainExpert/inspections/create.html',
				controller: 'DomainExpertInspectionsControllerCreate',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dateTimePicker']);
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert-inspections-view', {
				parent: 'domainExpert',
				url: '/inspections/:id',
				templateUrl: 'views/domainExpert/inspections/view.html',
				controller: 'DomainExpertInspectionsControllerView',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['ngJsTree']);
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('domainExpert-inspections-report', {
				parent: 'domainExpert',
				url: '/inspections/:id/report',
				templateUrl: 'views/domainExpert/inspections/report.html',
				controller: 'DomainExpertInspectionsControllerReport',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['highcharts']);
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);