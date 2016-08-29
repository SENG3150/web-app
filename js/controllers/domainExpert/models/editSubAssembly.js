//Controller to edit a sub assembly
angular
    .module('joy-global')
    .controller('DomainExpertModelsControllerEditSubAssembly', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'SubAssemblies', '$stateParams', 'toastr', function ($scope, LayoutService, $state, DataTablesService, SubAssemblies, $stateParams, toastr) {
        $scope.modelId = $stateParams.id;
        $scope.subAssemblyId = $stateParams.subAssemblyId;

        $scope.loading = true;

        SubAssemblies.one($scope.subAssemblyId).get({include: 'tests'}).then(function (data) {
            $scope.subAssembly = data;
            $scope.loading = false;
        });

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
                route: 'domainExpert-models-EditSubAssembly',
                displayName: 'Edit Sub Assembly'
            }
        ]);

        $scope.submitEditing = function() {
            if ($scope.validateName() == true && $scope.validateTests() == true) {
                $scope.subAssembly.post()
                    .then(function () {
                        toastr.clear();
                        toastr.success('Sub Assembly was updated successfully.');
                        $state.go('domainExpert-models-view', {id: $scope.modelId});
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error updating the Sub Assembly.');
                    });
            }
        };

        $scope.validateName = function() {
            if($scope.subAssembly.name == '' || $scope.subAssembly.name == null) {
                toastr.clear();
                toastr.error('Enter a Sub Assembly name.');
                return false;
            }

            return true;
        };

        $scope.validateTests = function() {
            //machine general
            if(typeof($scope.subAssembly.machineGeneral) !== 'boolean') {
                toastr.clear();
                toastr.error('Internal Error');
                return false;
            }

            //oil test
            if(typeof($scope.subAssembly.oil) !== 'boolean') {
                toastr.clear();
                toastr.error('Internal Error');
                return false;
            }

            //wear test
            if(typeof($scope.subAssembly.wear) !== 'boolean') {
                toastr.clear();
                toastr.error('Internal Error');
                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitEditing);

    }]);