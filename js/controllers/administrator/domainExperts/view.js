angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerView', ['$scope', 'DomainExperts' ,'$stateParams', 'LayoutService', function ($scope, DomainExperts ,$stateParams, LayoutService ) {
		$scope.domainExpertsId = $stateParams.id;

		$scope.domainexpert = DomainExperts.one($scope.domainExpertsId).get().$object;

	}]);