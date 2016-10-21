describe('AdministratorTechniciansControllerView', function() {
    var AdministratorTechniciansControllerView, rootScope, $state, toastr, httpBackend, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$state_, _toastr_, _$httpBackend_, _ENV_) {
        AdministratorTechniciansControllerView = $controller;
        rootScope = _$rootScope_;
        $state = _$state_;
        toastr = _toastr_;
        httpBackend = _$httpBackend_;
        ENV = _ENV_;
    }));

    it('should exist', function() {
        var controller = AdministratorTechniciansControllerView('AdministratorTechniciansControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorTechniciansControllerView('AdministratorTechniciansControllerView', {$scope: scope});
        });

        it('should be successful', function() {
            scope.technician = {
                id: 1,
                username: 'user',
                firstName: 'first',
                lastName: 'last',
                email: 'email',
                password: 'password',
                temporary: false,
                loginExpiresTime: 11/11/16
            };

            expect(scope.validate()).toBe(true);
        });

        it('should be successful, with temporary status', function() {
            scope.technician = {
                id: 1,
                username: 'user',
                firstName: 'first',
                lastName: 'last',
                email: 'email',
                password: 'password',
                temporary: true,
                loginExpiresTime: 11/11/16
            };

            expect(scope.validate()).toBe(true);
        });

        it('fails due to technician username being null', function() {
            scope.technician = {
                id: 1,
                username: null,
                firstName: 'first',
                lastName: 'last',
                email: 'email',
                password: 'password',
                temporary: false,
                loginExpiresTime: 11/11/16
            };

            expect(scope.validate()).toBe(false);
        });

        it('fails due to empty username', function() {
            scope.technician = {
                id: 1,
                username: '',
                firstName: 'first',
                lastName: 'last',
                email: 'email',
                password: 'password',
                temporary: false,
                loginExpiresTime: 11/11/16
            };

            expect(scope.validate()).toBe(false);
        });

        it('fails due to null loginExpiresTime', function() {
            scope.technician = {
                id: 1,
                username: 'user',
                firstName: 'first',
                lastName: 'last',
                email: 'email',
                password: 'password',
                temporary: true,
                loginExpiresTime: null
            };

            expect(scope.validate()).toBe(false);
        });

        it('fails due to empty loginExpiresTime', function() {
            scope.technician = {
                id: 1,
                username: 'user',
                firstName: 'first',
                lastName: 'last',
                email: 'email',
                password: 'password',
                temporary: true,
                loginExpiresTime: ''
            };

            expect(scope.validate()).toBe(false);
        });

        it('fails due to password and confirmPassword not matching', function() {
            scope.technician = {
                id: 1,
                username: 'user',
                firstName: 'first',
                lastName: 'last',
                email: 'email',
                password: 'password',
                temporary: false,
                loginExpiresTime: 11/11/16
            };

            scope.password = 'password';
            scope.confirmPassword = 'notPassword';

            expect(scope.validate()).toBe(false);
        });
    });

    describe('.save()', function() {
        var scope, controller;

        beforeEach(inject(function() {
            scope = rootScope.$new();
            controller = AdministratorTechniciansControllerView('AdministratorTechniciansControllerView', {$scope: scope});

            httpBackend.when('GET', ENV.apiEndpoint + 'technicians').respond({
                "id": 1,
                "username": "user",
                "firstName": "first",
                "lastName": "last",
                "email": "email",
                "password": "password",
                "temporary": false,
                "loginExpiresTime": 11/11/16
            });
            httpBackend.flush();
        }));

        it('should save', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'technicians/' + scope.technician.id).respond(200, '');

            spyOn($state, 'go');

            scope.password = 'password';
            scope.confirmPassword = 'password';

            scope.save();
            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('administrator-technicians-index');
        });

        it('should be a server error', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'technicians/' + scope.technician.id).respond(422, '');

            spyOn(toastr, 'error');

            scope.save();
            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error updating the user.');
        });
    })
});