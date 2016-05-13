angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerIndex', ['$scope', 'Administrators', function ($scope, Administrators) {
		$scope.administrators = Administrators.getList().$object;
	}]);
