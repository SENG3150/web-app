//Controller to show the information about a model
angular
    .module('joy-global')
    .controller('DomainExpertModelsControllerView', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'Models', '$stateParams', '$confirm', 'MajorAssemblies', 'SubAssemblies', 'toastr', 'Machines', function ($scope, LayoutService, $state, DataTablesService, Models, $stateParams, $confirm, MajorAssemblies, SubAssemblies, toastr, Machines) {
        $scope.modelId = $stateParams.id;
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['View Model', 'Models']);
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-models-index',
                displayName: 'Models'
            },
            {
                route: '',
                displayName: 'View Model'
            }
        ]);

        Models
            .one($scope.modelId)
            .get({include: 'machines,majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly,majorAssemblies.subAssemblies.tests'})
            .then(function (data) {
                $scope.loading = false;
                $scope.model = data;

                LayoutService.reset();
                LayoutService.setTitle([$scope.model.name, 'Models']);
                LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Add Machine</button>');
                LayoutService.getPageHeader().setBreadcrumbs([
                    {
                        route: 'domainExpert-index',
                        displayName: 'Home'
                    },
                    {
                        route: 'domainExpert-models-index',
                        displayName: 'Models'
                    },
                    {
                        route: 'domainExpert-models-view({ id: ' + $scope.modelId + ' })',
                        displayName: $scope.model.name
                    }
                ]);

                LayoutService.getPageHeader().onClicked(function () {
                    $state.go('domainExpert-machines-create');
                });
            });

        //allow the user to delete a major assembly
        $scope.deleteMajor = function (id, name) {
            //create a confirmation box the ensure the user wishes to delete the major assembly
            $confirm({
                text: 'Are you sure you want to delete the Major Assembly: ' + name + '?',
                title: 'Delete Major Assembly',
                ok: 'Delete',
                cancel: 'Cancel'
            }).then(function () {

                //API call to the server to delete the Major Assembly
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

        //allow the user to delete a sub assembly
        $scope.deleteSub = function (id, name) {
            //create a confirmation box the ensure the user wishes to delete the sub assembly
            $confirm({
                text: 'Are you sure you want to delete the Sub Assembly: ' + name + '?',
                title: 'Delete Sub Assembly',
                ok: 'Delete',
                cancel: 'Cancel'
            }).then(function () {
                //API call to the server to delete the Sub Assembly
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

        //allow the user to delete a machine
        $scope.deleteMachine = function (id, name) {
            //create a confirmation box the ensure the user wishes to delete the machine
            $confirm({
                text: 'Are you sure you want to delete the Machine: ' + name + '?',
                title: 'Delete Machine',
                ok: 'Delete',
                cancel: 'Cancel'
            }).then(function () {
                //API call tot he server to delete the machine
                Machines.one(id).remove().then(function () {
                    toastr.clear();
                    toastr.success('Machine was deleted successfully.');
                    $state.reload();
                }, function () {
                    toastr.clear();
                    toastr.error('There was an error deleting the Machine.');
                });
            });
        };

        $scope.dtOptions = DataTablesService.prepare('Machines');
    }]);