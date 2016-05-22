angular
    .module('joy-global')
    .factory('Comments', ['APIService', 'Restangular', function (APIService, Restangular) {
        //https://scotch.io/tutorials/create-a-laravel-and-angular-single-page-comment-application
        return {
            save: function (data) {
                console.log(data);
                var baseComments = Restangular.all('comments');
                return baseComments.post(data);
            },

            destroy: function (id) {

            }
        }
    }]);