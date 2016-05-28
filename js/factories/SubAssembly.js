angular
    .module('joy-global')
    .factory('SubAssemblies', ['APIService', function (APIService) {
        //returns an Restangular object for sub assemblies to allow api calls.
        return APIService.service('subAssemblies');
    }]);