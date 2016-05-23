angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerView', ['$scope', 'Administrators' ,'$stateParams', 'LayoutService', function ($scope, Administrators ,$stateParams, LayoutService ) {
		$scope.administratorId = $stateParams.id;

		$scope.administrator = Administrators.one($scope.administratorId).get().$object;

	}]);