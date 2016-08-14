//Controller to show the information about a model
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerView', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'Models', '$stateParams', '$confirm', 'MajorAssemblies', 'SubAssemblies', 'toastr', function ($scope, LayoutService, $state, DataTablesService, Models, $stateParams, $confirm, MajorAssemblies, SubAssemblies, toastr) {
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

        $scope.deleteMajor = function(id, name) {
            $confirm({text: 'Are you sure you want to delete the Major Assembly: ' + name + '?', title: 'Delete Major Assembly', ok: 'Delete', cancel: 'Cancel'})
                .then(function() {
                    MajorAssemblies.one(id).remove().then(function () {
                        toastr.clear();
                        toastr.success('Major Assembly was deleted successfully.');
                        $state.reload();
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error deleting the Major Assembly.');
                    });
                });
        };

        $scope.deleteSub = function(id, name) {
            $confirm({text: 'Are you sure you want to delete the Sub Assembly: ' + name + '?', title: 'Delete Sub Assembly', ok: 'Delete', cancel: 'Cancel'})
                .then(function() {
                    SubAssemblies.one(id).remove().then(function () {
                        toastr.clear();
                        toastr.success('Sub Assembly was deleted successfully.');
                        $state.reload();
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error deleting the Sub Assembly.');
                    });
                });
        };

        LayoutService.getPageHeader().onClicked($scope.goTo);

        $scope.dtOptions = DataTablesService.prepare('Models');
    }]);