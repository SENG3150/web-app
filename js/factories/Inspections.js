angular
	.module('joy-global')
	.factory('Inspections', ['APIService', function (APIService) {
		return APIService.service('inspections');
	}]);