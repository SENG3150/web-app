angular
    .module('joy-global')
    .factory('SubAssemblyTests', ['APIService', function (APIService) {
        //returns an Restangular object for sub assemblies tests to allow api calls.
        return APIService.service('subAssemblyTests');
    }]);