//Controller to add a major assembly to a model
angular
    .module('joy-global')
    .controller('DomainExpertModelsControllerAddMajorAssembly', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'MajorAssemblies', '$stateParams', 'toastr', function ($scope, LayoutService, $state, DataTablesService, MajorAssemblies, $stateParams, toastr) {
        $scope.modelId = $stateParams.id;

        $scope.majorAssembly = {
            name: null,
            model: {
                id:$scope.modelId
            }
        }

        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Models']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Save </button>');
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
                displayName: 'Edit Model'
            },
            {
                route: 'domainExpert-models-addMajorAssembly',
                displayName: 'Add Major Assembly'
            }
        ]);

        $scope.submitMajorAssembly = function() {
            if ($scope.validate() == true) {
                MajorAssemblies.post($scope.majorAssembly)
                    .then(function () {
                        toastr.clear();
                        toastr.success('Major Assembly was created successfully.');
                        $state.go('domainExpert-models-view',{ id: $scope.modelId });
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the Major Assembly.');
                    });
            }
        };

        $scope.validate = function() {
            if($scope.majorAssembly.name == '' || $scope.majorAssembly.name == null) {
                toastr.clear();
                toastr.error('Enter Major Assembly name.');
                return false;
            }
            if(parseInt($scope.majorAssembly.model.id) == NaN|| $scope.majorAssembly.model.id == null) {
                toastr.clear();
                toastr.error('Internal Error.');
                return false;
            }
            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitMajorAssembly);

        LayoutService.getPageHeader().onClicked($scope.goTo);
    }]);