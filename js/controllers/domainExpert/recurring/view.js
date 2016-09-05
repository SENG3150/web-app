// Controller for allowing of viewing of all schedules of an inspection
angular
	.module('joy-global')
	.controller('DomainExpertRecurringControllerView', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', '$state', '$confirm', '$stateParams', 'DataTablesService', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, $state, $confirm, $stateParams, DataTablesService) {
		$scope.inspectionScheduleId = $stateParams.id;

		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Recurring Inspection ' + $scope.inspectionScheduleId, 'Recurring Inspections']);
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-recurring-index',
				displayName: 'Recurring Inspections'
			},
			{
				route: 'domainExpert-recurring-view({ id: ' + $scope.inspectionScheduleId + ' })',
				displayName: 'Recurring Inspection ' + $scope.inspectionScheduleId
			}
		]);

		// GET the inspection schedule data from the server
		InspectionSchedules
			.one($scope.inspectionScheduleId)
			.get({include: 'inspection,inspections.scheduler,inspections.technician'})
			.then(function (data) {
					$scope.loading = false;
					$scope.inspectionSchedule = data;
				}
			);

		$scope.moment = moment;
		$scope.dtOptions = DataTablesService.prepare('Inspection History');
	}]);