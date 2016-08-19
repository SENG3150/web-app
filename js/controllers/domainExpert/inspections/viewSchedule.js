//Controller for allowing of viewing of all schedules of an inspection
angular
    .module('joy-global')
    .controller('DomainExpertInspectionsControllerViewSchedule', ['$scope', 'Inspections', 'moment', 'LayoutService', 'DataTablesService', '$state', '$stateParams', function ($scope, Inspections, moment, LayoutService, DataTablesService, $state, $stateParams) {
        $scope.inspectionId = $stateParams.id;
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Inspection ' + $scope.inspectionId, 'Inspections']);
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
                route: 'domainExpert-inspections-index',
                displayName: 'Inspection ' + $scope.inspectionId
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

        $scope.moment = moment;
        $scope.dtOptions = DataTablesService.prepare('Inspections');

        LayoutService.getPageHeader().onClicked(function () {
            $state.go('domainExpert-inspections-index')
        });
    }]);