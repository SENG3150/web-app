angular
	.module('joy-global')
	.factory('Machines', ['APIService', function (APIService) {
		return APIService.service('machines');
	}]);