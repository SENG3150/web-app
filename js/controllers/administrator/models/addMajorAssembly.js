//Controller to add a major assembly to a model
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerAddMajorAssembly', ['$scope', 'DomainExperts', 'LayoutService', '$state', 'DataTablesService', 'Models', '$stateParams', function ($scope, DomainExperts, LayoutService, $state, DataTablesService, Models, $stateParams) {
        $scope.modelId = $stateParams.id;
        $scope.majorAssemblyId = $stateParams.majorAssemblyId;
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Models']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Save </button>');
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
                route: 'administrator-models-view({ id: ' + $scope.modelId + ' })',
                displayName: 'Edit Model'
            },
            {
                route: 'administrator-models-addMajorAssembly',
                displayName: 'Add Major Assembly'
            }
        ]);

        LayoutService.getPageHeader().onClicked($scope.goTo);
    }]);