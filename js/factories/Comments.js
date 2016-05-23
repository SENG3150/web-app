angular
    .module('joy-global')
    .factory('Comments', ['APIService', 'Restangular', function (APIService, Restangular) {
        return {
            save: function (data) {
                return APIService.service('comments').post(data);
            },

            destroy: function (id) {

            }
        }
    }]);