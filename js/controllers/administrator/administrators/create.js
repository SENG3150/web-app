angular
    .module('joy-global')
    .controller('AdministratorAdministratorsControllerCreate', ['$scope', '$state', 'toastr', 'LayoutService', 'Administrators', function ($scope, $state, toastr, LayoutService, Administrators) {
        $scope.administrator = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        };

        LayoutService.reset();
        LayoutService.setTitle(['New Administrator', 'Administrators']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'administrator-index',
                displayName: 'Home'
            },
            {
                route: 'administrator-administrators-index',
                displayName: 'Administrators'
            },
            {
                route: 'administrator-administrators-create',
                displayName: 'New Administrator'
            }
        ]);


        $scope.submitUser = function () {
            if ($scope.validate() == true) {
                Administrators.post($scope.administrator)
                    .then(function () {
                        toastr.clear();
                        toastr.success('User was created successfully.');
                        $state.go('administrator-administrators-index');
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the user.');
                    });

            }
        };

        $scope.validate = function () {
            if ($scope.administrator.username == '' || $scope.administrator.username == null) {
                toastr.clear();
                toastr.error('Enter user name.');

                return false;
            }

            if ($scope.administrator.firstName == '' || $scope.administrator.firstName == null) {
                toastr.clear();
                toastr.error('Enter first name.');

                return false;
            }

            if ($scope.administrator.lastName == '' || $scope.administrator.lastName == null) {
                toastr.clear();
                toastr.error('Enter last name.');

                return false;
            }

            if ($scope.administrator.email == '' || $scope.administrator.email == null) {
                toastr.clear();
                toastr.error('Enter a valid email address.');

                return false;
            }

            if ($scope.administrator.password == '' || $scope.administrator.password == null) {
                toastr.clear();
                toastr.error('Enter a password.');

                return false;
            }

            if ($scope.administrator.password != $scope.administrator.confirmPassword) {
                toastr.clear();
                toastr.error('Passwords must match.');

                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitUser);
    }]);