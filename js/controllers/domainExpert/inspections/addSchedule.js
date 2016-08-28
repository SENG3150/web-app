//Controller to allow the adding of recurring schedules to inspections
angular
    .module('joy-global')
    .controller('DomainExpertInspectionsControllerAddSchedule', ['$scope', 'Inspections', 'InspectionSchedules', 'moment', 'LayoutService', '$state', '$stateParams', 'toastr', '_', function ($scope, Inspections, InspectionSchedules, moment, LayoutService, $state, $stateParams, toastr, _) {
        $scope.inspectionId = $stateParams.id;
        $scope.loading = false;

        $scope.timeIntervals = [
            {id: 'minutes', value: 'Minutes'},
            {id: 'hours', value: 'Hours'},
            {id: 'days', value: 'Days'},
            {id: 'weeks', value: 'Weeks'},
            {id: 'months', value: 'Months'},
            {id: 'years', value: 'Years'}
        ];

        $scope.inspectionSchedule = {
            inspection: {
                id: $scope.inspectionId
            },
            value: 0,                            // every [value]*[period] the inspection is repeated (eg, every 7 days)
            period: 'days'                       // (days/weeks/months/years)
        };

        LayoutService.reset();
        LayoutService.setTitle(['Create Recurring Inspection']);
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
                route: 'domainExpert-inspections-view({ id: ' + $scope.inspectionId + ' })',
                displayName: 'Inspection ' + $scope.inspectionId
            },
            {
                route: 'domainExpert-inspections-addSchedule',
                displayName: 'Create Inspection Schedule'
            }
        ]);

        $scope.submitSchedule = function () {
            toastr.clear();
            if ($scope.inspectionSchedule.value > 0) {
                InspectionSchedules.post($scope.inspectionSchedule)
                    .then(function () {
                        toastr.success('The inspection was scheduled successfully.');
                        $state.go('domainExpert-inspections-viewSchedule', {id: $scope.inspectionId});
                    },
                    function () {
                        toastr.error('There was an error while scheduling the inspection.', 'Error');
                    }
                );
            } else {
                toastr.warning('You must select a value.');
            }
        };

        LayoutService.getPageHeader().onClicked($scope.submitSchedule);
    }]);