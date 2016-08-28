//Controller for allowing of viewing of all schedules of an inspection
angular
    .module('joy-global')
    .controller('DomainExpertInspectionsControllerViewSchedule', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', '$state', '$confirm', '$stateParams', 'toastr', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, $state, $confirm, $stateParams, toastr) {
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

        $scope.inspectionSchedule = InspectionSchedules.one($scope.inspectionScheduleId).get({
            include: 'inspection, value, period'
        }).then(
            function (data) {
                $scope.loading = false;
                
                $scope.inspectionSchedule = data;
            }
        );

        $scope.moment = moment;

        $scope.deleteSchedule = function(id) {
            $confirm({text: 'Are you sure you want to delete this schedule?', title: 'Delete Schedule', ok: 'Delete', cancel: 'Cancel'})
                .then(function() {
                    InspectionSchedules.one(id).remove().then(function () {
                        toastr.clear();
                        toastr.success('Schedule was deleted successfully.');
                        $state.reload();
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error deleting the Schedule.');
                    });
                });
        };

        LayoutService.getPageHeader().onClicked(function () {
            $state.go('domainExpert-inspections-addSchedule', {id: $scope.inspectionId});
        });
    }]);