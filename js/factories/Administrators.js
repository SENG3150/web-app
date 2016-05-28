angular
	.module('joy-global')
	.factory('Administrators', ['APIService', function (APIService) {
		//returns an Restangular object for administrators to allow api calls.
		return APIService.service('administrators');
	}]);