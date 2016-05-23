angular
	.module('joy-global')
	.factory('Inspections', ['APIService', function (APIService) {
		var service = APIService.service('inspections');

		service.getBulk = function () {
			return APIService.service('inspections/bulk');
		};

		return service;
	}]);