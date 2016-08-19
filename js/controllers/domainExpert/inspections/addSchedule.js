//Controller to allow the adding of recurring schedules to inspections
angular
    .module('joy-global')
    .controller('DomainExpertInspectionsControllerAddSchedule', ['$scope', 'Inspections', 'moment', 'LayoutService', 'DataTablesService', '$state', '$stateParams', 'toastr', function ($scope, Inspections, moment, LayoutService, DataTablesService, $state, $stateParams, toastr) {
        $scope.inspectionId = $stateParams.id;
        $scope.loading = false;

        $scope.timeIntervals = [
            {id: 'days', value: 'Days'},
            {id: 'weeks', value: 'Weeks'},
            {id: 'months', value: 'Months'},
            {id: 'years', value: 'Years'}
        ];

        $scope.schedule = {
            startTime: moment().add(7, 'days'),
            value: 0,           // ???How many times it will recur, the frequency by which it will recur (if period=6months & value=2, then an inspection will occur every 3 months or twice in that period)???
            period: 0,          // the length of time the inspections will repeat for (days/weeks/months/years)
            interval: 0
        };

        LayoutService.reset();
        LayoutService.setTitle(['Inspections']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
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
                route: 'domainExpert-inspections-addSchedule',
                displayName: 'Inspection ' + $scope.inspectionId
            }
        ]);

        $scope.inspection = Inspections.one($scope.inspectionId).get({
            include: 'technician,scheduler,machine.model,majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'});

        $scope.save = function () {
            toastr.clear();
            toastr.success('Schedule was saved. But not really.');

            $state.go('domainExpert-inspections-index')
        };

        LayoutService.getPageHeader().onClicked($scope.save);
    }]);