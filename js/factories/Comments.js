angular
    .module('joy-global')
    .factory('Comments', ['APIService', 'Restangular', function (APIService, Restangular) {
        return {
            save: function (data) {
                //save a comment 
                return APIService.service('comments').post(data);
            },

            destroy: function (id) {

            }
        }
    }]);