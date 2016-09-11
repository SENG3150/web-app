//controller to allow the creation of new machines
angular
    .module('joy-global')
    .controller('DomainExpertMachinesControllerCreate', ['$scope', '$state', 'LayoutService', 'Machines', 'toastr', 'Models', function ($scope, $state, LayoutService, Machines, toastr, Models) {
        $scope.loading = true;

        $scope.machine = {
            name: '',
            model: {
                id: null,
                name: null
            }
        };

        $scope.selectedModel = null;

        LayoutService.reset();
        LayoutService.setTitle(['New Machine', 'Machines']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
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
                route: 'domainExpert-machines-create',
                displayName: 'New Machine'
            }
        ]);

        //get the data about all models
        Models.getList().then(function (data) {
            $scope.loading = false;

            $scope.models = _.sortBy(data, function (item) {
                return item.name.toLowerCase();
            });

            if ($scope.models.length > 0) {
                $scope.setModel($scope.models[0]);
            }
        });

        $scope.setModel = function (model) {
            $scope.selectedModel = model;
            $scope.machine.model = model;
        };

        //save the machine
        $scope.submitMachine = function () {
            //validate the machine data is correct before saving it
            if ($scope.validate() == true) {
                //API call to the server to save the machine
                Machines.post($scope.machine)
                    .then(function () {
                        toastr.clear();
                        toastr.success('Machine was created successfully.');
                        $state.go('domainExpert-machines-index');
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the machine.');
                    });
            }
        };

        //validate the machine data
        $scope.validate = function () {
            if ($scope.machine.name == '' || $scope.machine.name == null) {
                toastr.clear();
                toastr.error('Enter machine name.');
                return false;
            }

            if ($scope.machine.model.id == '' || $scope.machine.model.id == null) {
                toastr.clear();
                toastr.error('Please choose a model.');
                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitMachine);
    }]);