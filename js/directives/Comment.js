angular
    .module('joy-global')
    .directive('addComment', [function () {
        return {
            restrict: "EA",
            scope: {
                location: "@",
                locationId: "@",
            },
            controller: ['$scope', 'Comments', 'AuthService', 'moment', 'toastr', function($scope, Comments, AuthService, moment, toastr) {
                $scope.commentData = {};

                $scope.submitComment = function() {
                    toastr.info('Attempting to save your comment');
                    var user = AuthService.getUser();

                    $scope.commentData[user.type] = user.primary.id;
                    $scope.commentData.timeCommented = moment().format();

                    if($scope.location != null && $scope.locationId != null) {
                        $scope.commentData[$scope.location] = $scope.locationId;
                    }

                    Comments.save($scope.commentData).then(function() {
                        toastr.clear();
                        toastr.success('Your comment was saved successfully!');
                    }, function() {
                        toastr.clear();
                        toastr.error('Their was an error saving your comment.');
                    });;
                };
            }],
            templateUrl: 'views/common/comment.html',
        };
    }]);