//Controller for allowing of viewing of all inspections
angular
    .module('joy-global')
    .controller('DomainExpertInspectionsControllerIndexSchedule', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', 'DataTablesService', '$state', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, DataTablesService, $state) {
        $scope.loading = false;

        LayoutService.reset();
        LayoutService.setTitle(['Recurring Scheduled Inspections']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-fw fa-plus"></i> Add Schedule</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-inspections-index',
                displayName: 'Inspections'
            },
            {
                route: 'domainExpert-inspections-indexSchedule',
                displayName: 'Recurring Inspections'
            }
        ]);
/*
        //get a list of all inspections that are in the system
        Inspections.getList({include: 'machine.model,technician,scheduler'}).then(function (data) {
            $scope.loading = false;
            $scope.inspections = data;
        });
*/
        InspectionSchedules.getList({include: 'startTime, inspection, value, period'}).then(function (data) {
            $scope.loading = false;
            $scope.inspectionSchedule = data;
        });

        $scope.moment = moment;
        $scope.dtOptions = DataTablesService.prepare('InspectionSchedules');

        LayoutService.getPageHeader().onClicked(function () {
            $state.go('domainExpert-inspections-addSchedule')
        });
    }]);