angular
    .module('joy-global')
    .factory('SubAssemblies', ['APIService', function (APIService) {
        return APIService.service('subAssemblies');
    }]);