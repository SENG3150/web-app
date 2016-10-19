describe('AdministratorAdministratorsControllerCreate', function() {
    var AdministratorAdministratorsControllerCreate, rootScope, $state, toastr, httpBackend, ENV;
    
    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$state_, _toastr_, _$httpBackend_, _ENV_) {
        AdministratorAdministratorsControllerCreate = $controller;
        rootScope = _$rootScope_;
        $state = _$state_;
        toastr = _toastr_;
        httpBackend = _$httpBackend_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = AdministratorAdministratorsControllerCreate('AdministratorAdministratorsControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });
    
    describe('.validate()', function() {
        var scope, controller;
        
        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorAdministratorsControllerCreate('AdministratorAdministratorsControllerCreate', {$scope: scope});
        });

        it('should be successful', function() {
            scope.administrator.username = 'user';
            scope.administrator.email = 'email';
            scope.administrator.firstName = 'first';
            scope.administrator.lastName = 'last';
            scope.administrator.password = 'password';
            scope.administrator.confirmPassword = 'password';
            expect(scope.validate()).toBe(true);
        });

        it('fails due to username being null', function() {
            scope.administrator.username = null;
            scope.administrator.email = 'email';
            scope.administrator.firstName = 'first';
            scope.administrator.lastName = 'last';
            scope.administrator.password = 'password';
            scope.administrator.confirmPassword = 'password';
            expect(scope.validate()).toBe(false);
        });

        it('fails due to username being empty', function() {
            scope.administrator.username = '';
            scope.administrator.email = 'email';
            scope.administrator.firstName = 'first';
            scope.administrator.lastName = 'last';
            scope.administrator.password = 'password';
            scope.administrator.confirmPassword = 'password';
            expect(scope.validate()).toBe(false);
        });

        it('fails due to password and confirmPassword not matching', function() {
            scope.administrator.username = 'user';
            scope.administrator.email = 'email';
            scope.administrator.firstName = 'first';
            scope.administrator.lastName = 'last';
            scope.administrator.password = 'password';
            scope.administrator.confirmPassword = 'notPassword';
            expect(scope.validate()).toBe(false);
        });
    });
    
    describe('.submitUser()', function() {
        var scope, controller;
        
        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorAdministratorsControllerCreate('AdministratorAdministratorsControllerCreate', {$scope: scope});
        });

        it('should successfully save the new user', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'administrators').respond([{
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password',
                confirmPassword: 'password'
            }]);
            httpBackend.when('POST', ENV.apiEndpoint + 'administrators').respond(200, '');

            spyOn($state, 'go');

            scope.administrator.username = 'user';
            scope.administrator.email = 'email';
            scope.administrator.firstName = 'first';
            scope.administrator.lastName = 'last';
            scope.administrator.password = 'password';
            scope.administrator.confirmPassword = 'password';
            scope.submitUser();

            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('administrator-administrators-index');
        });

        it('should be a server error', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'administrators').respond([{
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password',
                confirmPassword: 'password'
            }]);
            httpBackend.when('POST', ENV.apiEndpoint + 'administrators').respond(422, '');

            spyOn(toastr, 'error');

            scope.administrator.username = 'user';
            scope.administrator.email = 'email';
            scope.administrator.firstName = 'first';
            scope.administrator.lastName = 'last';
            scope.administrator.password = 'password';
            scope.administrator.confirmPassword = 'password';
            scope.submitUser();

            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error creating the user.');
        });
    });
});