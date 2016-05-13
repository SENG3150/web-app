angular
	.module('joy-global')
	.factory('Administrators', ['APIService', function (APIService) {
		return APIService.service('administrators');
	}]);