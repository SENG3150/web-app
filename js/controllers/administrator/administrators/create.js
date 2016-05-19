angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerCreate', ['$scope', 'Administrators', function ($scope, Administrators) {
		$scope.administrators = Administrators.getList().$object;
		
		$scope.newUserData = {};
		
		$scope.submitUser = function(){
			$scope.newUserData.name = $scope.newUserData.firstName + " " + $scope.newUserData.lastName;
			
			console.log($scope.newUserData);
		};
		
		
	}]);