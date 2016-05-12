angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerIndex', ['$scope', 'Inspections', 'moment', function ($scope, Inspections, moment) {
		$scope.inspections = Inspections.getList().$object;

		$scope.moment = moment;
	}]);