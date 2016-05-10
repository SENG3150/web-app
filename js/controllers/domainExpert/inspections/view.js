angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerView', ['$scope', 'Inspections', 'moment', '$stateParams', function ($scope, Inspections, moment, $stateParams) {
		$scope.inspectionId = $stateParams.id;

		$scope.inspection = Inspections.one($scope.inspectionId).get().$object;

		$scope.moment = moment;
	}]);