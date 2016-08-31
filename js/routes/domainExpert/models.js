//set up the different available routes an administrator can take to manage different administrator users
angular
    .module('joy-global')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('domainExpert-models-index', {
                parent: 'domainExpert',
                url: '/models',
                templateUrl: 'views/domainExpert/models/index.html',
                controller: 'DomainExpertModelsControllerIndex',
                resolve: {
                    loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['dataTables'])
                    }],
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-create', {
                parent: 'domainExpert',
                url: '/models/create',
                templateUrl: 'views/domainExpert/models/create.html',
                controller: 'DomainExpertModelsControllerCreate',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-view', {
                parent: 'domainExpert',
                url: '/models/view/:id',
                templateUrl: 'views/domainExpert/models/view.html',
                controller: 'DomainExpertModelsControllerView',
                resolve: {
	                loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
		                return $ocLazyLoad.load(['dataTables'])
	                }],
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-view-majorAssembly-create', {
                parent: 'domainExpert',
                url: '/models/view/:id/create',
                templateUrl: 'views/domainExpert/models/majorAssembly/create.html',
                controller: 'DomainExpertModelsViewMajorAssemblyControllerCreate',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
	        .state('domainExpert-models-view-majorAssembly-view', {
		        parent: 'domainExpert',
		        url: '/models/view/:id/:majorAssemblyId',
		        templateUrl: 'views/domainExpert/models/majorAssembly/view.html',
		        controller: 'DomainExpertModelsViewMajorAssemblyControllerView',
		        resolve: {
			        loggedIn: ['AuthService', function (AuthService) {
				        return AuthService.checkPermissions(true);
			        }]
		        }
	        })
            .state('domainExpert-models-view-subAssembly-create', {
                parent: 'domainExpert',
	            url: '/models/view/:id/:majorAssemblyId/create',
                templateUrl: 'views/domainExpert/models/subAssembly/create.html',
                controller: 'DomainExpertModelsViewSubAssemblyControllerCreate',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
	        .state('domainExpert-models-view-subAssembly-view', {
		        parent: 'domainExpert',
		        url: '/models/view/:id/:majorAssemblyId/:subAssemblyId',
		        templateUrl: 'views/domainExpert/models/subAssembly/view.html',
		        controller: 'DomainExpertModelsViewSubAssemblyControllerView',
		        resolve: {
			        loggedIn: ['AuthService', function (AuthService) {
				        return AuthService.checkPermissions(true);
			        }]
		        }
	        });
    }]);