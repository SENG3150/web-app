//set up the different available routes an administrator can take to manage different technician users
angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('administrator-technicians-index', {
				parent: 'administrator',
				url: '/technicians',
				templateUrl: 'views/administrator/technicians/index.html',
				controller: 'AdministratorTechniciansControllerIndex',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dataTables'])
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('administrator-technicians-create', {
				parent: 'administrator',
				url: '/technicians/create',
				templateUrl: 'views/administrator/technicians/create.html',
				controller: 'AdministratorTechniciansControllerCreate',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dateTimePicker'])
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			})
			.state('administrator-technicians-view', {
				parent: 'administrator',
				url: '/technicians/:id',
				templateUrl: 'views/administrator/technicians/view.html',
				controller: 'AdministratorTechniciansControllerView',
				resolve: {
					loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load(['dateTimePicker'])
					}],
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);