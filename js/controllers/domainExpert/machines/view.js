angular
    .module('joy-global')
    .controller('DomainExpertMachinesControllerView', ['$scope', '$state', 'Inspections', 'Machines', '$stateParams', 'LayoutService', function ($scope, $state, Inspections, Machines, $stateParams, LayoutService) {
        $scope.inspections = Inspections.getList({include: 'machine'}).$object;
        //$scope.machines = Machines.getList({include: 'model.majorAssemblies.subAssemblies'}).$object;
        $scope.machineId = $stateParams.id;
        $scope.machine = Machines.one($scope.machineId).get({include: 'model.majorAssemblies.subAssemblies'}).$object;

        LayoutService.reset();
        LayoutService.setTitle(['Machine ' + $scope.machineId, 'Machines']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-calendar-plus-o""></i> Schedule Inspection</button>');
        $scope.goTo = function () {
            $state.go('domainExpert-inspections-create({id:' + $scope.machineId + ' })');
        };

        LayoutService.getPageHeader().onClicked($scope.goTo);
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-machines-index',
                displayName: 'Machines'
            },
            {
                route: 'domainExpert-machines-view({ id: ' + $scope.machineId + ' })',
                displayName: 'Machine ' + $scope.machineId
            }
        ]);
    }]);