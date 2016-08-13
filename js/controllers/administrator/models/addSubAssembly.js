//Controller to add a sub assembly to a models major assembly
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerAddSubAssembly', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'SubAssemblies', '$stateParams', 'toastr', function ($scope, LayoutService, $state, DataTablesService, SubAssemblies, $stateParams, toastr) {
        $scope.modelId = $stateParams.id;
        $scope.majorAssemblyId = $stateParams.majorAssemblyId;

        $scope.subAssembly = {
            name: null,
            majorAssembly: $scope.majorAssemblyId
        }

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
                route: 'administrator-models-addSubAssembly',
                displayName: 'Add Sub Assembly'
            }
        ]);

        $scope.submitSubAssembly = function() {
            if ($scope.validate() == true) {
                SubAssemblies.post($scope.subAssembly)
                    .then(function () {
                        toastr.clear();
                        toastr.success('Sub Assembly was created successfully.');
                        $state.go('administrator-models-view', { id: $scope.modelId });
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the Sub Assembly.');
                    });
            }
        };

        $scope.validate = function() {
            if($scope.subAssembly.name == '' || $scope.subAssembly.name == null) {
                toastr.clear();
                toastr.error('Enter Sub Assembly name.');
                return false;
            }
            if(parseInt($scope.subAssembly.majorAssembly) == NaN|| $scope.subAssembly.majorAssembly == null) {
                toastr.clear();
                toastr.error('Internal Error.');
                return false;
            }
            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitSubAssembly);

    }]);