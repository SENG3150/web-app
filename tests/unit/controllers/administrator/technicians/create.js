describe('AdministratorTechniciansControllerCreate', function() {
    var AdministratorTechniciansControllerCreate, rootScope, $state, toastr, httpBackend, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$state_, _toastr_, _$httpBackend_, _ENV_) {
        AdministratorTechniciansControllerCreate = $controller;
        rootScope = _$rootScope_;
        $state = _$state_;
        toastr = _toastr_;
        httpBackend = _$httpBackend_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = AdministratorTechniciansControllerCreate('AdministratorTechniciansControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorTechniciansControllerCreate('AdministratorTechniciansControllerCreate', {$scope: scope});
        });

        it('should be successful', function() {
            scope.technician.username = 'user';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'password';
            scope.technician.temporary = false;
            scope.technician.loginExpiresTime = '';
            expect(scope.validate()).toBe(true);
        });

        it('should be successful, with temporary status', function() {
            scope.technician.username = 'user';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'password';
            scope.technician.temporary = true;
            scope.technician.loginExpiresTime = '11/11/16';
            expect(scope.validate()).toBe(true);
        });

        it('fails due to username being null', function() {
            scope.technician.username = null;
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'password';
            scope.technician.temporary = false;
            scope.technician.loginExpiresTime = '';
            expect(scope.validate()).toBe(false);
        });

        it('fails due to username being empty', function() {
            scope.technician.username = '';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'password';
            scope.technician.temporary = false;
            scope.technician.loginExpiresTime = '';
            expect(scope.validate()).toBe(false);
        });

        it('fails due to password and confirmPassword not matching', function() {
            scope.technician.username = 'user';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'notPassword';
            scope.technician.temporary = false;
            scope.technician.loginExpiresTime = '';
            expect(scope.validate()).toBe(false);
        });

        it('fails due to the loginExpiresTime being null', function() {
            scope.technician.username = 'user';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'notPassword';
            scope.technician.temporary = true;
            scope.technician.loginExpiresTime = null;
            expect(scope.validate()).toBe(false);
        });

        it('fails due to the loginExpiresTime being empty', function() {
            scope.technician.username = 'user';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'notPassword';
            scope.technician.temporary = true;
            scope.technician.loginExpiresTime = '';
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.submitUser()', function() {
        var scope, controller;

        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorTechniciansControllerCreate('AdministratorTechniciansControllerCreate', {$scope: scope});
        });

        it('should successfully save the new user', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'technicians').respond([{
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password',
                confirmPassword: 'password',
                temporary: false,
                loginExpiresTime: ''
            }]);
            httpBackend.when('POST', ENV.apiEndpoint + 'technicians').respond(200, '');

            spyOn($state, 'go');

            scope.technician.username = 'user';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'password';
            scope.technician.temporary = false;
            scope.technician.loginExpiresTime = '';
            scope.submitUser();

            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('administrator-technicians-index');
        });

        it('should be a server error', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'technicians').respond([{
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password',
                confirmPassword: 'password'
            }]);
            httpBackend.when('POST', ENV.apiEndpoint + 'technicians').respond(422, '');

            spyOn(toastr, 'error');

            scope.technician.username = 'user';
            scope.technician.email = 'email';
            scope.technician.firstName = 'first';
            scope.technician.lastName = 'last';
            scope.technician.password = 'password';
            scope.technician.confirmPassword = 'password';
            scope.submitUser();

            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error creating the user.');
        });
    });
});