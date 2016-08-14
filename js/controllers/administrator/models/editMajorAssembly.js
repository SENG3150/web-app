//Controller to edit a sub assembly
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerEditMajorAssembly', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'MajorAssemblies', '$stateParams', 'toastr', function ($scope, LayoutService, $state, DataTablesService, MajorAssemblies, $stateParams, toastr) {
        $scope.modelId = $stateParams.id;
        $scope.majorAssemblyId = $stateParams.majorAssemblyId;

        $scope.loading = true;

        MajorAssemblies.one($scope.majorAssemblyId).get().then(function (data) {
            $scope.majorAssembly = data;
            $scope.loading = false;
        });

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
                route: 'administrator-models-EditMajorAssembly',
                displayName: 'Edit Major Assembly'
            }
        ]);

        $scope.submitMajorAssembly = function() {
            if ($scope.validate() == true) {
                $scope.majorAssembly.post()
                    .then(function () {
                        toastr.clear();
                        toastr.success('Major Assembly was updated successfully.');
                        $state.go('administrator-models-view', {id: $scope.modelId});
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error updating the Major Assembly name.');
                    });
            }
        };

        $scope.validate = function() {
            if($scope.majorAssembly.name == '' || $scope.majorAssembly.name == null) {
                toastr.clear();
                toastr.error('Enter a Major Assembly name.');
                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitMajorAssembly);

    }]);