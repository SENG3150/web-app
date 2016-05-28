angular
	.module('joy-global')
	.factory('Inspections', ['APIService', function (APIService) {

		var service = APIService.service('inspections');

		//add a function to the service object to get a different Restangular object to allow a bulk json file
		//upload for scheduling of inspections
		service.getBulk = function () {
			return APIService.service('inspections/bulk');
		};

		//returns an Restangular object for administrators to allow api calls.
		return service;
	}]);