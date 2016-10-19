describe('AuthRoute', function(){

    var $rootScope, $state, $injector, lazyLoadMock, $httpBackend, AuthService;

    beforeEach(function() {

        module('joy-global', function($provide) {
            $provide.value('$ocLazyLoad', lazyLoadMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, _$httpBackend_, _AuthService_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
            AuthService = _AuthService_;
            $httpBackend = _$httpBackend_;

            spyOn(AuthService, 'checkPermissions').and.returnValue(true);

        })
    });

    it('should map auth state  to correct url', function () {
        state = $state.get('auth');
        expect(state.url).toEqual('/auth');
    });

    it('should map auth state  to correct template url', function () {
        state = $state.get('auth');
        expect(state.templateUrl).toEqual('views/layouts/plain.html');
    });



    it('should map login state to correct url', function () {
        state = $state.get('auth.login');
        expect(state.url).toEqual('/login?r');
    });

    it('should map login state to correct template url', function () {
        state = $state.get('auth.login');
        expect(state.templateUrl).toEqual('views/auth/login.html');
    });

    it('should map login state to use the right controller', function () {
        state = $state.get('auth.login');
        expect(state.controller).toEqual('AuthControllerLogin');
    });


    it('should map logout state to correct url', function () {
        state = $state.get('auth.logout');
        expect(state.url).toEqual('/logout');
    });

    it('should map logout state to use the right controller', function () {
        state = $state.get('auth.logout');
        expect(state.controller).toEqual('AuthControllerLogout');
    });

});



