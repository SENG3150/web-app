
angular
	.module('joy-global')
	.controller('AdministratorTechniciansControllerView', ['$scope', 'Technicians' ,'$stateParams', 'LayoutService', 'moment', function ($scope, Technicians ,$stateParams, LayoutService , moment ) {
		$scope.technicianId = $stateParams.id;

		$scope.technician = Technicians.one($scope.technicianId).get().$object;
		$scope.start = moment().subtract(7, 'days'); // This is set to whatever

	}]);
