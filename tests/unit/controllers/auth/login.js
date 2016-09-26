describe('AuthControllerLogin', function () {
    var AuthControllerLogin, AuthService, $state, rootScope, toastr;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _AuthService_, _$state_, _toastr_) {
        AuthControllerLogin = $controller;
        rootScope = _$rootScope_;
        AuthService = _AuthService_;
        $state = _$state_;
        toastr = _toastr_;
    }));

    it('should exist', function(){
        var controller = AuthControllerLogin('AuthControllerLogin', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.changeType()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = AuthControllerLogin('AuthControllerLogin', {$scope: scope, AuthService: AuthService});
        });

        it('should change to domainexpert', function () {
            scope.changeType('domainexpert');
            expect(scope.type).toBe('domainexpert');
        });

        it('should change to administrator', function () {
            scope.changeType('administrator');
            expect(scope.type).toBe('administrator');
        });

        it('should change to technician', function () {
            scope.changeType('technician');
            expect(scope.type).toBe('technician');
        });
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = AuthControllerLogin('AuthControllerLogin', {$scope: scope});
        });

        it('should return true when a username and password is provided', function () {
            scope.username = 'a';
            scope.password = 'a';
            expect(scope.validate()).toBe(true);
        });

        it('should return false when no username is provided, but a password is provided', function () {
            scope.username = '';
            scope.password = 'a';
            expect(scope.validate()).toBe(false);
        });

        it('should return false when no password is provided, but a username is provided', function () {
            scope.username = 'a';
            scope.password = '';
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.login()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = AuthControllerLogin('AuthControllerLogin', {$scope: scope});
        });

        //http://blog.xebia.com/testing-promises-in-angularjs/
        it('should be successfully logged in as a domain expert', inject(function($q) {
            var deferred = $q.defer();
            spyOn(AuthService, 'authenticate').and.returnValue(deferred.promise);
            spyOn($state, 'go');

            scope.username = 'domainexpert';
            scope.password = 'domainexpert';
            scope.type = 'domainexpert';
            scope.login();

            deferred.resolve();
            scope.$digest();

            expect($state.go).toHaveBeenCalledWith('index');
        }));

        it('should be successfully logged in as an administrator', inject(function($q) {
            var deferred = $q.defer();
            spyOn(AuthService, 'authenticate').and.returnValue(deferred.promise);
            spyOn($state, 'go');

            scope.username = 'administrator';
            scope.password = 'administrator';
            scope.type = 'administrator';
            scope.login();

            deferred.resolve();
            scope.$digest();

            expect($state.go).toHaveBeenCalledWith('index');
        }));
    });
});