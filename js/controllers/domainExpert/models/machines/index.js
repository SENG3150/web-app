//Controller to show a list of all current machines for a particular model
angular
    .module('joy-global')
    .controller('DomainExpertModelsMachinesControllerIndex', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'Models', '$stateParams', '$confirm', 'Machines', 'toastr', function ($scope, LayoutService, $state, DataTablesService, Models, $stateParams, $confirm, Machines, toastr) {
        $scope.modelId = $stateParams.id;
        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Machines']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Machine</button>');
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
                route: 'domainExpert-models-machines-index',
                displayName: 'Machines'
            }
        ]);
        Models.one($scope.modelId).get({include: 'machines'}).then(function (data) {
            $scope.loading = false;
            $scope.machines = data;
        });

        $scope.goTo = function() {
            $state.go('domainExpert-models-machines-create', {id: $scope.modelId});
        };

        $scope.delete = function(id, name) {
            $confirm({text: 'Are you sure you want to delete the Machine: ' + name + '?', title: 'Delete Machine', ok: 'Delete', cancel: 'Cancel'})
                .then(function() {
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

        LayoutService.getPageHeader().onClicked($scope.goTo);

        $scope.dtOptions = DataTablesService.prepare('Models');
    }]);