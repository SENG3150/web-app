angular
    .module('joy-global')
    .factory('Comments', ['APIService', '$http', function (APIService, $http) {
        //https://scotch.io/tutorials/create-a-laravel-and-angular-single-page-comment-application
        return {
            save: function (data) {
                console.log("find out the correct url for saving");
                // return $http({
                //     method: 'POST',
                //     url: 'comments',
                //     data: data
                // });
            },

            destroy: function (id) {
                console.log("find out the correct url for deleteing");
                //return $http.delete('/comments/'+id);
            }
        }
    }]);