angular
    .module('joy-global')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('domainExpert-downtime-index', {
                parent: 'domainExpert',
                url: '/downtime',
                templateUrl: 'views/domainExpert/downtime/index.html',
                controller: 'DomainExpertDowntimeControllerIndex',
                resolve: {
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            })
            .state('domainExpert-downtime-import', {
                parent: 'domainExpert',
                url: '/downtime/import',
                templateUrl: 'views/domainExpert/downtime/import.html',
                controller: 'DomainExpertDowntimeControllerImport',
                resolve: {
                    loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['xlsx']);
                    }],
                    loggedIn: ['AuthService', function (AuthService) {
                        return AuthService.checkPermissions(true);
                    }]
                }
            });
    }]);