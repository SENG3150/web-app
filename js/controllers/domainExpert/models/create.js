//Controller to allow the creation of a new model
angular
    .module('joy-global')
    .controller('DomainExpertModelsControllerCreate', ['$scope', '$state', 'toastr', 'LayoutService', 'Models', function ($scope, $state, toastr, LayoutService, Models) {
        $scope.model = {
            name: ''
        }

        LayoutService.reset();
        LayoutService.setTitle(['New Model', 'Models']);
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
                route: 'domainExpert-model-create',
                displayName: 'New Model'
            }
        ]);

        //POST the model data to the server
        $scope.submitModel = function () {
            if ($scope.validate() == true) { //validate the data before sending it

                //API call to the server to create a new model
                Models.post($scope.model)
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

        //validate the model data
        $scope.validate = function () {
            if ($scope.model.name == '' || $scope.model.name == null) {
                toastr.clear();
                toastr.error('Enter Model name.');
                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitModel);
    }]);