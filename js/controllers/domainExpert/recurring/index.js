// Controller for allowing of viewing of all inspections
angular
	.module('joy-global')
	.controller('DomainExpertRecurringControllerIndex', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', 'DataTablesService', '$state', '$confirm', 'toastr', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, DataTablesService, $state, $confirm, toastr) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Recurring Inspections']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Recurring Inspection</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-recurring-index',
				displayName: 'Recurring Inspections'
			}
		]);

		InspectionSchedules.getList({include: 'inspection.machine'}).then(function (data) {
			$scope.loading = false;
			$scope.inspectionSchedules = data;
		});

		$scope.delete = function (id) {
			$confirm({
				text: 'Are you sure you want to delete this recurring inspection?',
				title: 'Delete Recurring Inspection',
				ok: 'Delete',
				cancel: 'Cancel'
			})
				.then(function () {
					InspectionSchedules
						.one(id)
						.remove()
						.then(function () {
							toastr.clear();
							toastr.success('Recurring inspection was deleted successfully.');
							$state.reload();
						}, function () {
							toastr.clear();
							toastr.error('There was an error deleting the recurring inspection.');
						});
				});
		};

		$scope.moment = moment;
		$scope.dtOptions = DataTablesService.prepare('Recurring Inspections');

		LayoutService.getPageHeader().onClicked(function () {
			$state.go('domainExpert-recurring-create');
		});
	}]);