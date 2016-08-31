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

		$scope.inspectionSchedule = {
			inspection: {
				id: $scope.inspectionId
			},
			value: 0,
			period: 'days'
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

		$scope.save = function () {
			toastr.clear();

			if ($scope.inspectionSchedule.value > 0) {
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

		$scope.setInspection = function (inspection) {
			$scope.selectedInspection = inspection;
			$scope.inspectionSchedule.inspection = inspection.id;
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);