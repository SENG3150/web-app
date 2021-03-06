describe('AdministratorDomainExpertsControllerCreate', function() {
    var AdministratorDomainExpertsControllerCreate, rootScope, $state, toastr, httpBackend, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$state_, _toastr_, _$httpBackend_, _ENV_) {
        AdministratorDomainExpertsControllerCreate = $controller;
        rootScope = _$rootScope_;
        $state = _$state_;
        toastr = _toastr_;
        httpBackend = _$httpBackend_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = AdministratorDomainExpertsControllerCreate('AdministratorDomainExpertsControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorDomainExpertsControllerCreate('AdministratorDomainExpertsControllerCreate', {$scope: scope});
        });

        it('should be successful', function() {
            scope.domainExpert.username = 'user';
            scope.domainExpert.email = 'email';
            scope.domainExpert.firstName = 'first';
            scope.domainExpert.lastName = 'last';
            scope.domainExpert.password = 'password';
            scope.domainExpert.confirmPassword = 'password';
            expect(scope.validate()).toBe(true);
        });

        it('fails due to username being null', function() {
            scope.domainExpert.username = null;
            scope.domainExpert.email = 'email';
            scope.domainExpert.firstName = 'first';
            scope.domainExpert.lastName = 'last';
            scope.domainExpert.password = 'password';
            scope.domainExpert.confirmPassword = 'password';
            expect(scope.validate()).toBe(false);
        });

        it('fails due to username being empty', function() {
            scope.domainExpert.username = '';
            scope.domainExpert.email = 'email';
            scope.domainExpert.firstName = 'first';
            scope.domainExpert.lastName = 'last';
            scope.domainExpert.password = 'password';
            scope.domainExpert.confirmPassword = 'password';
            expect(scope.validate()).toBe(false);
        });

        it('fails due to password and confirmPassword not matching', function() {
            scope.domainExpert.username = 'user';
            scope.domainExpert.email = 'email';
            scope.domainExpert.firstName = 'first';
            scope.domainExpert.lastName = 'last';
            scope.domainExpert.password = 'password';
            scope.domainExpert.confirmPassword = 'notPassword';
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.submitUser()', function() {
        var scope, controller;

        beforeEach(function() {
            scope = rootScope.$new();
            controller = AdministratorDomainExpertsControllerCreate('AdministratorDomainExpertsControllerCreate', {$scope: scope});
        });

        it('should successfully save the new user', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'domainExperts').respond([{
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password',
                confirmPassword: 'password'
            }]);
            httpBackend.when('POST', ENV.apiEndpoint + 'domainExperts').respond(200, '');

            spyOn($state, 'go');

            scope.domainExpert.username = 'user';
            scope.domainExpert.email = 'email';
            scope.domainExpert.firstName = 'first';
            scope.domainExpert.lastName = 'last';
            scope.domainExpert.password = 'password';
            scope.domainExpert.confirmPassword = 'password';
            scope.submitUser();

            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('administrator-domainExperts-index');
        });

        it('should be a server error', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'domainExperts').respond([{
                username: 'user',
                email: 'email',
                firstName: 'first',
                lastName: 'last',
                password: 'password',
                confirmPassword: 'password'
            }]);
            httpBackend.when('POST', ENV.apiEndpoint + 'domainExperts').respond(422, '');

            spyOn(toastr, 'error');

            scope.domainExpert.username = 'user';
            scope.domainExpert.email = 'email';
            scope.domainExpert.firstName = 'first';
            scope.domainExpert.lastName = 'last';
            scope.domainExpert.password = 'password';
            scope.domainExpert.confirmPassword = 'password';
            scope.submitUser();

            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error creating the user.');
        });
    });
});