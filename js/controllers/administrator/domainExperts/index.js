angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerIndex', ['$scope', 'DomainExperts', function ($scope, DomainExperts) {
		$scope.domainExperts = DomainExperts.getList().$object;
	}]);