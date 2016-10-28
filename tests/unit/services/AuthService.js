describe('AuthService', function() {
    var AuthService, $auth, ENV, $localStorage, $q, $http;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function (_AuthService_, _$auth_, _ENV_, _$localStorage_, _$q_, _$http_) {
        AuthService = _AuthService_;
        $auth = _$auth_;
        ENV = _ENV_;
        $localStorage = _$localStorage_;
        $q = _$q_;
        $http = _$http_;
    }));

    it('should exist', function () {
        expect(AuthService).toBeDefined();
    });
    
    describe('.setUser()', function() {
        it('should exist', function() {
            expect(AuthService.setUser).toBeDefined();
        });
    });
    
    describe('.getUser()', function() {
        it('should exist', function() {
            expect(AuthService.getUser).toBeDefined();
        });
    });
    
    describe('.authenticate()', function() {
        it('should exist', function() {
            expect(AuthService.authenticate).toBeDefined();
        });
        
        it('should run q.defer', function() {
            spyOn($q, 'defer').and.callThrough();
            
            var credentials = 'credentials';
            
            AuthService.authenticate(credentials);
            
            expect($q.defer).toHaveBeenCalled();
        });
        
        it('should run auth.login', function() {
            spyOn($auth, 'login').and.callThrough();
            
            var credentials = 'credentials';
            
            AuthService.authenticate(credentials);

            expect($auth.login).toHaveBeenCalled();
        });
    });
    
    describe('.checkPermissions()', function() {
        it('should exist', function() {
            expect(AuthService.checkPermissions).toBeDefined();
        });

        it('should run q.defer', function() {
            spyOn($q, 'defer').and.callThrough();

            var credentials = 'credentials';

            AuthService.authenticate(credentials);

            expect($q.defer).toHaveBeenCalled();
        });

        it('should run auth.login if requiredLogin is true and isAuthenticated is false', function() {
            spyOn($auth, 'isAuthenticated').and.callThrough().and.returnValue(false);
            spyOn($auth, 'getToken').and.callThrough();

            var requiredLogin = true;

            AuthService.checkPermissions(requiredLogin);

            expect($auth.getToken).toHaveBeenCalled();
        });

        it('should not run auth.login if requiredLogin is true and isAuthenticated is true', function() {
            spyOn($auth, 'isAuthenticated').and.callThrough().and.returnValue(true);
            spyOn($auth, 'getToken').and.callThrough();

            var requiredLogin = true;

            AuthService.checkPermissions(requiredLogin);

            expect($auth.getToken).not.toHaveBeenCalled();
        });

        it('should not run auth.login if requiredLogin is false and isAuthenticated is true', function() {
            spyOn($auth, 'isAuthenticated').and.callThrough().and.returnValue(true);
            spyOn($auth, 'getToken').and.callThrough();

            var requiredLogin = false;

            AuthService.checkPermissions(requiredLogin);

            expect($auth.getToken).not.toHaveBeenCalled();
        });

        it('should not run auth.login if requiredLogin is false and isAuthenticated is false', function() {
            spyOn($auth, 'isAuthenticated').and.callThrough().and.returnValue(false);
            spyOn($auth, 'getToken').and.callThrough();

            var requiredLogin = false;

            AuthService.checkPermissions(requiredLogin);

            expect($auth.getToken).not.toHaveBeenCalled();
        });
    });
});