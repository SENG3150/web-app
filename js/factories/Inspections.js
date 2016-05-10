angular
	.module('joy-global')
	.factory('Inspections', ['Restangular', function (Restangular) {
		return Restangular.service('inspections');
	}]);