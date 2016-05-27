angular
    .module('joy-global')
    .controller('AdministratorTechniciansControllerCreate', ['$scope', '$state', 'toastr', 'LayoutService', 'Technicians', function ($scope, $state, toastr, LayoutService, Technicians) {
        $scope.technician = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            temporary: false,
            loginExpiresTime: ''
        };


        LayoutService.reset();
        LayoutService.setTitle(['New Technician', 'Technicians']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'administrator-index',
                displayName: 'Home'
            },
            {
                route: 'administrator-technicians-index',
                displayName: 'Technicians'
            },
            {
                route: 'administrator-technicians-create',
                displayName: 'New Technician'
            }
        ]);

        $scope.submitUser = function () {
            if ($scope.validate() == true) {
                Technicians.post($scope.technician)
                    .then(function () {
                        toastr.clear();
                        toastr.success('User was created successfully.');
                        $state.go('administrator-technicians-index');
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the user.');
                    });

            }
        };

        $scope.validate = function () {
            if ($scope.technician.username == '' || $scope.technician.username == null) {
                toastr.clear();
                toastr.error('Enter user name.');

                return false;
            }
            
            if ($scope.technician.firstName == '' || $scope.technician.firstName == null) {
                toastr.clear();
                toastr.error('Enter first name.');

                return false;
            }

            if ($scope.technician.lastName == '' || $scope.technician.lastName == null) {
                toastr.clear();
                toastr.error('Enter last name.');

                return false;
            }

            if ($scope.technician.email == '' || $scope.technician.email == null) {
                toastr.clear();
                toastr.error('Enter a valid email address.');

                return false;
            }

            if ($scope.technician.password == '' || $scope.technician.password == null) {
                toastr.clear();
                toastr.error('Enter a password.');

                return false;
            }

            if ($scope.technician.password != $scope.technician.confirmPassword) {
                toastr.clear();
                toastr.error('Passwords must match.');

                return false;
            }

            if ($scope.technician.temporary == true) {
                if ($scope.technician.loginExpiresTime == '' || $scope.technician.loginExpiresTime == null) {
                    toastr.clear();
                    toastr.error('Enter a date.');

                    return false;
                }
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitUser);
    }]);