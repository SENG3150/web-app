angular
	.module('joy-global')
	.factory('DomainExperts', ['APIService', function (APIService) {
		return APIService.service('domainExperts');
	}]);