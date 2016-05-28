angular
	.module('joy-global')
	.factory('DomainExperts', ['APIService', function (APIService) {
		//returns an Restangular object for domain experts to allow api calls.
		return APIService.service('domainExperts');
	}]);