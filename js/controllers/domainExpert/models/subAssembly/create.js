// Controller to add a sub assembly to a models major assembly
angular
    .module('joy-global')
    .controller('DomainExpertModelsViewSubAssemblyControllerCreate', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'SubAssemblies', '$stateParams', 'toastr', 'Models', function ($scope, LayoutService, $state, DataTablesService, SubAssemblies, $stateParams, toastr, Models) {
        $scope.modelId = $stateParams.id;
        $scope.majorAssemblyId = $stateParams.majorAssemblyId;

        $scope.subAssembly = {
            name: null,
            machineGeneral: false,
            oil: false,
            wear: false,
            uniqueDetails: []
        };

        $scope.uniqueDetails = [];

        $scope.loading = true;

        LayoutService.reset();
        LayoutService.setTitle(['Add Sub Assembly', 'View Model', 'Models']);
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
                route: 'domainExpert-models-view-subAssembly-create({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ' })',
                displayName: 'Add Sub Assembly'
            }
        ]);

        //get the information about the particular model
        Models.one($scope.modelId).get().then(function (data) {
            $scope.loading = false;
            $scope.model = data;

            //update the bread crumbs
            LayoutService.reset();
            LayoutService.setTitle(['Add Sub Assembly', $scope.model.name, 'Models']);
            LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Add</button>');
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
                    route: 'domainExpert-models-view-subAssembly-create({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ' })',
                    displayName: 'Add Sub Assembly'
                }
            ]);

            LayoutService.getPageHeader().onClicked($scope.save);
        });

        //save the sub assembly to the server
        $scope.save = function () {

            //validate the data before sending it tothe server
            if ($scope.validate() == true) {
                $scope.subAssembly.majorAssembly = $scope.majorAssemblyId;

                $scope.subAssembly.uniqueDetails = _.filter(
                    _.pluck(
                        $scope.uniqueDetails,
                        'uniqueDetail'
                    ),
                    function (uniqueDetail) {
                        return uniqueDetail != null && uniqueDetail != '';
                    }
                );

                //API call to the server to save the sub assembly
                SubAssemblies.post($scope.subAssembly)
                    .then(function () {
                        toastr.clear();
                        toastr.success('Sub assembly was created successfully.');
                        $state.go('domainExpert-models-view', {id: $scope.modelId});
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the sub assembly.');
                    });
            }
        };

        //validate the sub assembly
        $scope.validate = function () {
            if ($scope.subAssembly.name == '' || $scope.subAssembly.name == null) {
                toastr.clear();
                toastr.error('Enter sub assembly name.');
                return false;
            }

            return true;
        };

        //allow additions of unique details to the wear test to be performed in inspections
        $scope.addUniqueDetail = function () {
            $scope.uniqueDetails.push({
                uniqueDetail: ''
            });
        };

        //remove a unique detail field from the wear test
        $scope.removeUniqueDetail = function (index) {
            $scope.uniqueDetails.splice(index, 1);
        };
    }]);