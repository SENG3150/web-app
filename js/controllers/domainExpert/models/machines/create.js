//Controller to allow the creation of a new machine for a particular model
angular
    .module('joy-global')
    .controller('DomainExpertModelsMachinesControllerCreate', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'Machines', '$stateParams', 'toastr', function ($scope, LayoutService, $state, DataTablesService, Machines, $stateParams, toastr) {
        $scope.modelId = $stateParams.id;
        $scope.machine = {
            name: '',
            model: {
                id: $scope.modelId
            }
        };

        LayoutService.reset();
        LayoutService.setTitle(['New Machine', 'Machines']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
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
                route: 'domainExpert-models-machines-index({ id: ' + $scope.modelId + ' })',
                displayName: 'Machines'
            },
            {
                route: 'domainExpert-models-machines-create',
                displayName: 'New Machine'
            }
        ]);

        $scope.submitModel = function() {
            if ($scope.validate() == true) {
                Machines.post($scope.machine)
                    .then(function () {
                        toastr.clear();
                        toastr.success('Model was created successfully.');
                        $state.go('domainExpert-models-index');
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the model.');
                    });
            }
        };

        $scope.validate = function() {
            if($scope.machine.name == '' || $scope.machine.name == null) {
                toastr.clear();
                toastr.error('Enter Machine name.');
                return false;
            }

            if($scope.machine.model.id == '' || $scope.machine.model.id == null) {
                toastr.clear();
                toastr.error('Internal Error.');
                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitModel);
    }]);