angular
    .module('joy-global')
    .factory('Comments', ['APIService', function (APIService) {
	    return APIService.service('comments');
    }]);