//Controller to show a list of all current domain experts in the system
angular
    .module('joy-global')
    .controller('AdministratorModelsMachinesControllerIndex', ['$scope', 'DomainExperts', 'LayoutService', '$state', 'DataTablesService', 'Models', '$stateParams', function ($scope, DomainExperts, LayoutService, $state, DataTablesService, Models, $stateParams) {
        $scope.modelId = $stateParams.id;
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Machines']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Machine</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'administrator-index',
                displayName: 'Home'
            },
            {
                route: 'administrator-models-index',
                displayName: 'Models'
            }
        ]);
        Models.one($scope.modelId).get({include: 'machines'}).then(function (data) {
            $scope.loading = false;
            $scope.machines = data;
        });

        $scope.goTo = function() {
            $state.go('administrator-models-machines-create', {id: $scope.modelId});
        };

        LayoutService.getPageHeader().onClicked($scope.goTo);

        $scope.dtOptions = DataTablesService.prepare('Models');
    }]);