//Controller to show a list of all models in the system
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerIndex', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'Models', function ($scope, LayoutService, $state, DataTablesService, Models) {
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
            }
        ]);
        Models.getList().then(function (data) {
            $scope.loading = false;
            $scope.models = data;
        });

        $scope.goTo = function() {
            $state.go('administrator-models-create');
        };

        LayoutService.getPageHeader().onClicked($scope.goTo);

        $scope.dtOptions = DataTablesService.prepare('Models');
    }]);