describe('IndexRoute', function() {

    var $rootScope, $state, $injector, lazyLoadMock, $httpBackend, AuthService;
    beforeEach(function() {

        module('joy-global', function($provide) {
            $provide.value('$ocLazyLoad', lazyLoadMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, _$httpBackend_, _AuthService_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
            AuthService = _AuthService_;
            $httpBackend = _$httpBackend_;
            spyOn(AuthService, 'checkPermissions').and.returnValue(true);

        })
    });

    it('should map index state  to correct url', function () {
        state = $state.get('index');
        expect(state.url).toEqual('/');
    });

    it('should map administrator state to correct url', function () {
        state = $state.get('administrator');
        expect(state.url).toEqual('/administrator');

    });

    it('should map view administrator to correct template url', function () {
        state = $state.get('administrator');
        expect(state.templateUrl).toEqual('views/layouts/default.html');
    });


    it('should map domainExpert state to correct url', function () {
        state = $state.get('domainExpert');
        expect(state.url).toEqual('/domainExpert');
    });

    it('should map domainExpert state to correct template url', function () {
        state = $state.get('domainExpert');
        expect(state.templateUrl).toEqual('views/layouts/default.html');
    });


});



