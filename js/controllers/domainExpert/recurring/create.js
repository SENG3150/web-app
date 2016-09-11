// Controller to allow the adding of recurring schedules to inspections
angular
	.module('joy-global')
	.controller('DomainExpertRecurringControllerCreate', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', '$state', '$stateParams', 'toastr', '_', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, $state, $stateParams, toastr, _) {
		$scope.loading = true;
		$scope.moment = moment;

		$scope.timeIntervals = [
			{id: 'days', value: 'Days'},
			{id: 'weeks', value: 'Weeks'},
			{id: 'months', value: 'Months'},
			{id: 'years', value: 'Years'}
		];

		$scope.selectedInspection = null;

		// API call to the server to get all of the machine models in the system
		Inspections.getList({include: 'machine.model'}).then(
			function (data) {
				$scope.loading = false;

				$scope.inspections = _.sortBy(data, function (item) {
					return item.timeScheduled;
				}).reverse();

				if ($scope.inspections.length > 0) {
					$scope.setInspection($scope.inspections[0]);
				}
			}
		);

		// The parameters required to make a recurring inspection schedule
		$scope.inspectionSchedule = {
			inspection: {
				id: $scope.inspectionId		// Associates the schedule with an existing inspection
			},
			value: 0,						// Specifies how often the inspection will be repeated, if 6 and period is weeks, then the schedule repeats every 6 weeks
			period: 'days'					// Selected from timeIntervals (days, weeks, months, years)
		};

		LayoutService.reset();
		LayoutService.setTitle(['Create Recurring Inspection', 'Recurring Inspection']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
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
				route: 'domainExpert-recurring-create',
				displayName: 'Create Recurring Inspection'
			}
		]);

		// POST the inspection schedule data to the server
		$scope.save = function () {
			toastr.clear();

			if ($scope.inspectionSchedule.value > 0) {				// Ensures the user has entered a value for the schedule
				// API call to the server to create a new inspectionSchedule
				InspectionSchedules.post($scope.inspectionSchedule)
					.then(function () {
							toastr.success('The inspection was scheduled successfully.');
							$state.go('domainExpert-recurring-index');
						},
						function () {
							toastr.error('There was an error while creating the recurring inspection.', 'Error');
						}
					);
			} else {
				toastr.warning('You must select a value.');
			}
		};

		// Retrieves the inspection ID from the associated inspection
		$scope.setInspection = function (inspection) {
			$scope.selectedInspection = inspection;
			$scope.inspectionSchedule.inspection = inspection.id;
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);