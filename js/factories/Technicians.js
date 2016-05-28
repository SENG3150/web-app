angular
	.module('joy-global')
	.factory('Technicians', ['APIService', function (APIService) {
		//returns an Restangular object for technicians to allow api calls.
		return APIService.service('technicians');
	}]);