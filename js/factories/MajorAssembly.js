angular
    .module('joy-global')
    .factory('MajorAssemblies', ['APIService', function (APIService) {
        //returns an Restangular object for sub assemblies to allow api calls.
        return APIService.service('majorAssemblies');
    }]);