//Controller to edit a sub assembly
angular
    .module('joy-global')
    .controller('DomainExpertModelsViewMajorAssemblyControllerView', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'MajorAssemblies', '$stateParams', 'toastr', function ($scope, LayoutService, $state, DataTablesService, MajorAssemblies, $stateParams, toastr) {
        $scope.modelId = $stateParams.id;
        $scope.majorAssemblyId = $stateParams.majorAssemblyId;

        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Edit Major Assembly', 'View Model', 'Models']);
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
                route: 'domainExpert-models-view-majorAssembly-view({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ' })',
                displayName: 'Edit Major Assembly'
            }
        ]);

        //get the information about a particular Major Assembly
        MajorAssemblies.one($scope.majorAssemblyId).get({include: 'model'}).then(function (data) {
            $scope.loading = false;

            $scope.majorAssembly = data;
            $scope.model = $scope.majorAssembly.model;

            //update the breadcrumbs
            LayoutService.reset();
            LayoutService.setTitle(['Edit ' + $scope.majorAssembly.name, $scope.model.name, 'Models']);
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
                    route: 'domainExpert-models-view({ id: ' + $scope.modelId + ' })',
                    displayName: $scope.model.name
                },
                {
                    route: 'domainExpert-models-view-majorAssembly-view({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ' })',
                    displayName: 'Edit ' + $scope.majorAssembly.name
                }
            ]);

            LayoutService.getPageHeader().onClicked($scope.save);
        });

        //save the major assembly to the server
        $scope.save = function () {
            //validate the major assembly data before saving it
            if ($scope.validate() == true) {

                //API call to the server to save the major assembly
                $scope.majorAssembly.post()
                    .then(function () {
                        toastr.clear();
                        toastr.success('Major Assembly was updated successfully.');
                        $state.go('domainExpert-models-view', {id: $scope.modelId});
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error updating the major assembly name.');
                    });
            }
        };

        //validate the majoor assemblies data
        $scope.validate = function () {
            if ($scope.majorAssembly.name == '' || $scope.majorAssembly.name == null) {
                toastr.clear();
                toastr.error('Enter a major assembly name.');
                return false;
            }

            return true;
        };
    }]);