angular
    .module('joy-global')
    .directive('addComment', [function () {
        return {
            templateUrl: 'views/common/comment.html'
        };
    }]);