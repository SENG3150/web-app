//Controller for allowing of viewing of all schedules of an inspection
angular
    .module('joy-global')
    .controller('DomainExpertInspectionsControllerViewSchedule', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', '$state', '$stateParams', 'toastr', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, $state, $stateParams, toastr) {
        $scope.inspectionId = $stateParams.id;
        
        $scope.inspectionScheduleId = $stateParams.id;
        
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Inspection ' + $scope.inspectionId, 'Inspections']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Add Schedule</button>');
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
                route: 'domainExpert-inspections-view({ id: ' + $scope.inspectionId + ' })',
                displayName: 'Inspection ' + $scope.inspectionId
            },
            {
                route: 'domainExpert-inspections-viewSchedule',
                displayName: 'View Inspection Schedules'
            }
        ]);

        $scope.inspection = Inspections.one($scope.inspectionId).get({
            include: 'technician,scheduler,machine.model,majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
        }).then(
            function (data) {
                $scope.loading = false;

                $scope.inspection = data;

            }
        );
        
        $scope.inspectionSchedule = InspectionSchedules.one($scope.inspectionScheduleId).get({
            include: 'inspection, startTime, value, period, nextInspectionTime'
        }).then(
            function (data) {
                $scope.loading = false;
                
                $scope.inspectionSchedule = data;
            }
        );

        $scope.moment = moment;

        $scope.deleteSchedule = function () {
            toastr.success('Deleted Message');
            //delete inspectionSchedule;
        };

        LayoutService.getPageHeader().onClicked(function () {
            $state.go('domainExpert-inspections-addSchedule', {id: $scope.inspectionId});
        });
    }]);