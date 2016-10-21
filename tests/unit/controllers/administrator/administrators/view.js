describe('AdministratorAdministratorsControllerView', function() {
    var AdministratorAdministratorsControllerView, rootScope, $state, toastr, httpBackend, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$state_, _toastr_, _$httpBackend_, _ENV_) {
        AdministratorAdministratorsControllerView = $controller;
        rootScope = _$rootScope_;
        $state = _$state_;
        toastr = _toastr_;
        httpBackend = _$httpBackend_;
        ENV = _ENV_;
    }));
    
    it('should exist', function() {
        var controller = AdministratorAdministratorsControllerView('AdministratorAdministratorsControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorAdministratorsControllerView('AdministratorAdministratorsControllerView', {$scope: scope});
        });

        it('should be successful', function() {
            scope.administrator = {
                id: 1,
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password'
            };

            expect(scope.validate()).toBe(true);
        });

        it('fails due to administrator username being null', function() {
            scope.administrator = {
                id: 1,
                username: null,
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password'
            };

            expect(scope.validate()).toBe(false);
        });

        it('fails due to no administrator username', function() {
            scope.administrator = {
                id: 1,
                username: '',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password'
            };

            expect(scope.validate()).toBe(false);
        });

        it('fails due to password and confirmPassword not matching', function() {
            scope.administrator = {
                id: 1,
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password'
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
            controller = AdministratorAdministratorsControllerView('AdministratorAdministratorsControllerView', {$scope: scope});

            httpBackend.when('GET', ENV.apiEndpoint + 'administrators').respond({
                "id": 1,
                "username": "user",
                "email": "email",
                "firstName": "first",
                "lastName": "last",
                "password": "password"
            });
            httpBackend.flush();
        }));

        it('should save', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'administrators/' + scope.administrator.id).respond(200, '');
            
            spyOn($state, 'go');
            
            scope.password = 'password';
            scope.confirmPassword = 'password';
            
            scope.save();
            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('administrator-administrators-index');
        });

        it('should be a server error', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'administrators/' + scope.administrator.id).respond(422, '');
            
            spyOn(toastr, 'error');
            
            scope.save();
            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error updating the user.');
        });
    })
});