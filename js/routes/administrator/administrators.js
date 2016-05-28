//set up the different available routes an administrator can take to manage different administrator users
angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('administrator-administrators-index', {
				parent: 'administrator',
				url: '/administrators',
				templateUrl: 'views/administrator/administrators/index.html',
				controller: 'AdministratorAdministratorsControllerIndex',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables'])
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('administrator-administrators-create', {
				parent: 'administrator',
				url: '/administrators/create',
				templateUrl: 'views/administrator/administrators/create.html',
				controller: 'AdministratorAdministratorsControllerCreate',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('administrator-administrators-view', {
				parent: 'administrator',
				url: '/administrators/:id',
				templateUrl: 'views/administrator/administrators/view.html',
				controller: 'AdministratorAdministratorsControllerView',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);