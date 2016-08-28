//Controller for allowing of viewing of all inspections
angular
    .module('joy-global')
    .controller('DomainExpertInspectionsControllerIndexSchedule', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', 'DataTablesService', '$state', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, DataTablesService, $state) {
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Recurring Scheduled Inspections']);
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-inspections-indexSchedule',
                displayName: 'Recurring Inspections'
            }
        ]);

        InspectionSchedules.getList({include: 'inspection.machine'}).then(function (data) {
            $scope.loading = false;
            $scope.inspectionSchedules = data;
        });

        $scope.moment = moment;
        $scope.dtOptions = DataTablesService.prepare('InspectionSchedules');
    }]);