angular
	.module('joy-global')
	.controller('DomainExpertIndexControllerIndex', ['$scope', 'LayoutService', 'Inspections', '_', 'DataTablesService', function ($scope, LayoutService, Inspections, _, DataTablesService) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Home']);
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			}
		]);

		Inspections.getList({include: 'machine.model,technician,scheduler'}).then(function (data) {
			$scope.loading = false;

			$scope.inspections = data;

			$scope.upcomingInspections = _.filter($scope.inspections, function (inspection) {
				return moment(inspection.timeScheduled).isAfter(moment()) == true;
			});

			$scope.recentlyCompletedInspections = _.filter($scope.inspections, function (inspection) {
				if (inspection.timeCompleted != null) {
					var days = moment(inspection.timeCompleted).diff(moment(), 'days');

					return days < 7;
				} else {
					return false;
				}
			});
		});

		$scope.moment = moment;
		$scope.dtOptions = DataTablesService.prepare('Inspections');
	}]);