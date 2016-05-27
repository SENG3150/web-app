angular
    .module('joy-global')
    .controller('DomainExpertMachinesControllerView', ['$scope', '$state', 'Machines', '$stateParams', 'LayoutService', 'moment', 'DataTablesService', function ($scope, $state, Machines, $stateParams, LayoutService, moment, DataTablesService) {
        $scope.machineId = $stateParams.id;
	    $scope.loading = true;

	    $scope.moment = moment;
	    $scope.dtOptions = DataTablesService.prepare('Inspection History');
	    
        Machines.one($scope.machineId).get({include: 'model.majorAssemblies.subAssemblies,inspections.technician,inspections.scheduler'}).then(
	        function(data) {
		        $scope.loading = false;

		        $scope.machine = data;
	        }
        );

        LayoutService.reset();
        LayoutService.setTitle(['Machine ' + $scope.machineId, 'Machines']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-calendar-plus-o"></i> Schedule Inspection</button>');
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

	    LayoutService.getPageHeader().onClicked(function () {
		    $state.go('domainExpert-inspections-create');
	    });

    }]);