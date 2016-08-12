//Controller to show the information about a model
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerView', ['$scope', 'DomainExperts', 'LayoutService', '$state', 'DataTablesService', 'Models', '$stateParams', function ($scope, DomainExperts, LayoutService, $state, DataTablesService, Models, $stateParams) {
        $scope.modelId = $stateParams.id;
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Models']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Model</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'administrator-index',
                displayName: 'Home'
            },
            {
                route: 'administrator-models-index',
                displayName: 'Models'
            },
            {
                route: 'administrator-models-view',
                displayName: 'Edit Model'
            }
        ]);
        Models.one($scope.modelId).get({include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly,majorAssemblies.subAssemblies.tests'}).then(function (data) {
            $scope.loading = false;
            $scope.model = data;
        });

        $scope.goTo = function() {
            $state.go('administrator-models-create');
        };

        LayoutService.getPageHeader().onClicked($scope.goTo);

        $scope.dtOptions = DataTablesService.prepare('Models');
    }]);