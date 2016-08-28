//Controller to allow the creation of a new model
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerCreate', ['$scope', '$state', 'toastr', 'LayoutService', 'Models', function ($scope, $state, toastr, LayoutService, Models) {
        $scope.model = {
            name: ''
        }

        LayoutService.reset();
        LayoutService.setTitle(['New Model', 'Models']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
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
                route: 'administrator-model-create',
                displayName: 'New Model'
            }
        ]);

        $scope.submitModel = function() {
            if ($scope.validate() == true) {
                Models.post($scope.model)
                    .then(function () {
                        toastr.clear();
                        toastr.success('Model was created successfully.');
                        $state.go('administrator-models-index');
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the model.');
                    });
            }
        };

        $scope.validate = function() {
            if($scope.model.name == '' || $scope.model.name == null) {
                toastr.clear();
                toastr.error('Enter Model name.');
                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitModel);
    }]);