//Controller to edit a sub assembly
angular
    .module('joy-global')
    .controller('AdministratorModelsControllerEditSubAssembly', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'SubAssemblies', '$stateParams', 'toastr', 'SubAssemblyTests', function ($scope, LayoutService, $state, DataTablesService, SubAssemblies, $stateParams, toastr, SubAssemblyTests) {
        $scope.modelId = $stateParams.id;
        $scope.subAssemblyId = $stateParams.subAssemblyId;

        $scope.loading = true;

        SubAssemblies.one($scope.subAssemblyId).get({include: 'tests'}).then(function (data) {
            $scope.subAssembly = data;

            $scope.subAssemblyTestsId = data.tests[0].id;

            SubAssemblyTests.one($scope.subAssemblyTestsId).get().then(function (data) {
                $scope.subAssemblyTest = data;
                $scope.loading = false;
            });
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
                route: 'administrator-models-EditSubAssembly',
                displayName: 'Edit Sub Assembly'
            }
        ]);

        $scope.submitEditing = function() {
            if ($scope.validateName() == true) {
                $scope.subAssembly.post()
                    .then(function () {
                        if ($scope.validateTests() == true) {
                            $scope.subAssemblyTest.post().then(function () {
                                toastr.clear();
                                toastr.success('Sub Assembly was updated successfully.');
                                $state.go('administrator-models-view', {id: $scope.modelId});
                            }, function () {
                                toastr.clear();
                                toastr.error('There was an error updating the Sub Assembly Tests.');
                            });
                        }
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error updating the Sub Assembly name.');
                    });
            }else {
                if ($scope.validateTests() == true) {
                    $scope.subAssemblyTest.post().then(function () {
                        toastr.clear();
                        toastr.success('Sub Assembly was updated successfully.');
                        $state.go('administrator-models-view', {id: $scope.modelId});
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error updating the Sub Assembly Tests.');
                    });
                }
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
            //used to check if lower is less then upper
            var mgLowerSet = false;
            var mgUpperSet = false;
            var oilLowerSet = false;
            var oilUpperSet = false;
            var wearLowerSet = false;
            var wearUpperSet = false;

            //server will not accept '' for lower and upper, if it happens to be '', set it to null
            if($scope.subAssemblyTest.machineGeneral.lower == '') {
                $scope.subAssemblyTest.machineGeneral.lower = null;
            }
            if($scope.subAssemblyTest.machineGeneral.upper == '') {
                $scope.subAssemblyTest.machineGeneral.upper = null;
            }
            if($scope.subAssemblyTest.oil.lower == '') {
                $scope.subAssemblyTest.oil.lower = null;
            }
            if($scope.subAssemblyTest.oil.upper == '') {
                $scope.subAssemblyTest.oil.upper = null;
            }
            if($scope.subAssemblyTest.wear.lower == '') {
                $scope.subAssemblyTest.wear.lower = null;
            }
            if($scope.subAssemblyTest.wear.upper == '') {
                $scope.subAssemblyTest.wear.upper = null;
            }

            //machine general
            if(typeof($scope.subAssemblyTest.machineGeneral.test) !== 'boolean') {
                toastr.clear();
                toastr.error('Internal Error');
                return false;
            }
            if(Number($scope.subAssemblyTest.machineGeneral.lower) === Number.NaN) {
                toastr.clear();
                toastr.error('Machine General Test Lower is Not a Number.');
                return false;
            }else if ($scope.subAssemblyTest.machineGeneral.lower != null){
                mgLowerSet = true;
            }
            if(Number($scope.subAssemblyTest.machineGeneral.upper) === Number.NaN) {
                toastr.clear();
                toastr.error('Machine General Test Upper is Not a Number.');
                return false;
            }else if ($scope.subAssemblyTest.machineGeneral.upper != null){
                mgUpperSet = true;
            }

            //oil test
            if(typeof($scope.subAssemblyTest.oil.test) !== 'boolean') {
                toastr.clear();
                toastr.error('Internal Error');
                return false;
            }
            if(Number($scope.subAssemblyTest.oil.lower) === Number.NaN) {
                toastr.clear();
                toastr.error('Oil Test Lower is Not a Number.');
                return false;
            }else if ($scope.subAssemblyTest.oil.lower != null){
                oilLowerSet = true;
            }
            if(Number($scope.subAssemblyTest.oil.upper) === Number.NaN) {
                toastr.clear();
                toastr.error('Oil Test Upper is Not a Number.');
                return false;
            }else if ($scope.subAssemblyTest.oil.upper != null) {
                oilUpperSet = true;
            }

            //wear test
            if(typeof($scope.subAssemblyTest.wear.test) !== 'boolean') {
                toastr.clear();
                toastr.error('Internal Error');
                return false;
            }

            if(Number($scope.subAssemblyTest.wear.lower) === Number.NaN) {
                toastr.clear();
                toastr.error('Wear Test Lower is Not a Number.');
                return false;
            }else if ($scope.subAssemblyTest.wear.lower != null) {
                wearLowerSet = true;
            }
            if(Number($scope.subAssemblyTest.wear.upper) === Number.NaN) {
                toastr.clear();
                toastr.error('Wear Test Upper is Not a Number.');
                return false;
            }else if ($scope.subAssemblyTest.wear.upper != null) {
                wearUpperSet = true;
            }

            //make sure lower are always lower then the upper value
            if(mgLowerSet && mgUpperSet) {
                if(Number($scope.subAssemblyTest.machineGeneral.lower) >= Number($scope.subAssemblyTest.machineGeneral.upper)) {
                    toastr.clear();
                    toastr.error('Machine General Test Lower must be a lower value then Upper');
                    return false;
                }
            }
            if(oilLowerSet && oilUpperSet) {
                if(Number($scope.subAssemblyTest.oil.lower) >= Number($scope.subAssemblyTest.oil.upper)) {
                    toastr.clear();
                    toastr.error('Oil Test Lower must be a lower value then Upper');
                    return false;
                }
            }
            if(wearLowerSet && wearUpperSet) {
                if(Number($scope.subAssemblyTest.wear.lower) >= Number($scope.subAssemblyTest.wear.upper)) {
                    toastr.clear();
                    toastr.error('Wear Test Lower must be a lower value then Upper');
                    return false;
                }
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitEditing);

    }]);