//Controller to allow the creation of domain experts to the system
angular
    .module('joy-global')
    .controller('AdministratorDomainExpertsControllerCreate', ['$scope', '$state', 'toastr', 'LayoutService', 'DomainExperts', function ($scope, $state, toastr, LayoutService, DomainExperts) {
        $scope.domainExpert = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        };

        LayoutService.reset();
        LayoutService.setTitle(['New Domain Expert', 'Domain Experts']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'administrator-index',
                displayName: 'Home'
            },
            {
                route: 'administrator-domainExperts-index',
                displayName: 'Domain Experts'
            },
            {
                route: 'administrator-domainExperts-create',
                displayName: 'New Domain Expert'
            }
        ]);

        //If the entered data passes validation, submit the data to the server
        $scope.submitUser = function () {
            if ($scope.validate() == true) {
                DomainExperts.post($scope.domainExpert)
                    .then(function () {
                        toastr.clear();
                        toastr.success('User was created successfully.');
                        $state.go('administrator-domainExperts-index');
                    }, function () {
                        toastr.clear();
                        toastr.error('There was an error creating the user.');
                    });
            }
        };

        //Validate all entered data before submitting to the server
        $scope.validate = function () {
            if ($scope.domainExpert.username == '' || $scope.domainExpert.username == null) {
                toastr.clear();
                toastr.error('Enter user name.');

                return false;
            }

            if ($scope.domainExpert.firstName == '' || $scope.domainExpert.firstName == null) {
                toastr.clear();
                toastr.error('Enter first name.');

                return false;
            }

            if ($scope.domainExpert.lastName == '' || $scope.domainExpert.lastName == null) {
                toastr.clear();
                toastr.error('Enter last name.');

                return false;
            }

            if ($scope.domainExpert.email == '' || $scope.domainExpert.email == null) {
                toastr.clear();
                toastr.error('Enter a valid email address.');

                return false;
            }

            if ($scope.domainExpert.password == '' || $scope.domainExpert.password == null) {
                toastr.clear();
                toastr.error('Enter a password.');

                return false;
            }

            if ($scope.domainExpert.password != $scope.domainExpert.confirmPassword) {
                toastr.clear();
                toastr.error('Passwords must match.');

                return false;
            }

            return true;
        };

        LayoutService.getPageHeader().onClicked($scope.submitUser);
    }]);