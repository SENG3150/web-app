//Controller to show a list of all models in the system
angular
    .module('joy-global')
    .controller('DomainExpertModelsControllerIndex', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'Models', '$confirm', 'toastr', function ($scope, LayoutService, $state, DataTablesService, Models, $confirm, toastr) {
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Models']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Model</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-models-index',
                displayName: 'Models'
            }
        ]);

        //API call to the server to get the data of all models in the system
        Models.getList().then(function (data) {
            $scope.loading = false;
            $scope.models = data;
        });

        $scope.goTo = function () {
            $state.go('domainExpert-models-create');
        };

        //allow the user to delete a model
        $scope.delete = function (id, name) {
            //create a confirmation box the ensure the user wishes to delete the model
            $confirm({
                text: 'Are you sure you want to delete the Model: ' + name + '?',
                title: 'Delete Model',
                ok: 'Delete',
                cancel: 'Cancel'
            }).then(function () {
                //API to the server to delete a model
                Models.one(id).remove().then(function () {
                    toastr.clear();
                    toastr.success('Model was deleted successfully.');
                    $state.reload();
                }, function () {
                    toastr.clear();
                    toastr.error('There was an error deleting the Model.');
                });
            });
        };

        LayoutService.getPageHeader().onClicked($scope.goTo);

        $scope.dtOptions = DataTablesService.prepare('Models');
    }]);