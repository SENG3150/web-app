angular
	.module('joy-global')
	.factory('Technicians', ['APIService', function (APIService) {
		return APIService.service('technicians');
	}]);