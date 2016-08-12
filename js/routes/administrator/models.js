//set up the different available routes an administrator can take to manage different administrator users
angular
    .module('joy-global')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('administrator-models-index', {
                parent: 'administrator',
                url: '/models',
                templateUrl: 'views/administrator/models/index.html',
                controller: 'AdministratorModelsControllerIndex',
                resolve: {
                    loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['dataTables'])
                    }],
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('administrator-models-create', {
                parent: 'administrator',
                url: '/models/create',
                templateUrl: 'views/administrator/models/create.html',
                controller: 'AdministratorModelsControllerCreate',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('administrator-models-machines-index', {
                parent: 'administrator',
                url: '/models/:id',
                templateUrl: 'views/administrator/models/machines/index.html',
                controller: 'AdministratorModelsMachinesControllerIndex',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('administrator-models-machines-create', {
                parent: 'administrator',
                url: '/models/:id/create',
                templateUrl: 'views/administrator/models/machines/create.html',
                controller: 'AdministratorModelsMachinesControllerCreate',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            });
    }]);