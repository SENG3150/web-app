describe('AdministratorIndexRoute', function(){

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

    it('should map index state  to correct url', function () {
        state = $state.get('administrator-index');
        expect(state.url).toEqual('/');
    });

    it('should map index state  to correct template url', function () {
        state = $state.get('administrator-index');
        expect(state.templateUrl).toEqual('views/administrator/index/index.html');
    });

    it('should map index state to use the right controller', function () {
        state = $state.get('administrator-index');
        expect(state.controller).toEqual('AdministratorIndexControllerIndex');
    });



});



