angular
	.module('joy-global')
	.factory('Machines', ['APIService', function (APIService) {
		//returns an Restangular object for machines to allow api calls.
		return APIService.service('machines');
	}]);