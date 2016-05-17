angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerView', ['$scope', 'Inspections', 'moment', '$stateParams', function ($scope, Inspections, moment, $stateParams) {
		$scope.inspectionId = $stateParams.id;

		$scope.inspection = Inspections.one($scope.inspectionId).get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly.tests'
		}).$object;
		
		$scope.moment = moment;
	}]);