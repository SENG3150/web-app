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
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-addMajorAssembly', {
                parent: 'domainExpert',
                url: '/models/view/:id/addMajorAssembly',
                templateUrl: 'views/domainExpert/models/addMajorAssembly.html',
                controller: 'DomainExpertModelsControllerAddMajorAssembly',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-addSubAssembly', {
                parent: 'domainExpert',
                url: '/models/view/:id/addSubAssembly/:majorAssemblyId',
                templateUrl: 'views/domainExpert/models/addSubAssembly.html',
                controller: 'DomainExpertModelsControllerAddSubAssembly',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-editSubAssembly', {
                parent: 'domainExpert',
                url: '/models/view/:id/editSubAssembly/:subAssemblyId',
                templateUrl: 'views/domainExpert/models/editSubAssembly.html',
                controller: 'DomainExpertModelsControllerEditSubAssembly',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-editMajorAssembly', {
                parent: 'domainExpert',
                url: '/models/view/:id/editMajorAssembly/:majorAssemblyId',
                templateUrl: 'views/domainExpert/models/editMajorAssembly.html',
                controller: 'DomainExpertModelsControllerEditMajorAssembly',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-machines-index', {
                parent: 'domainExpert',
                url: '/models/:id',
                templateUrl: 'views/domainExpert/models/machines/index.html',
                controller: 'DomainExpertModelsMachinesControllerIndex',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-models-machines-create', {
                parent: 'domainExpert',
                url: '/models/:id/create',
                templateUrl: 'views/domainExpert/models/machines/create.html',
                controller: 'DomainExpertModelsMachinesControllerCreate',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            });
    }]);