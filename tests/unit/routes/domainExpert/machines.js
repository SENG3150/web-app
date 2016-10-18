describe('DomainExpertMachinesRoute', function(){

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
        state = $state.get('domainExpert-machines-index');
        expect(state.url).toEqual('/machines');
    });

    it('should map index state  to correct template url', function () {
        state = $state.get('domainExpert-machines-index');
        expect(state.templateUrl).toEqual('views/domainExpert/machines/index.html');
    });

    it('should map index state to use the right controller', function () {
        state = $state.get('domainExpert-machines-index');
        expect(state.controller).toEqual('DomainExpertMachinesControllerIndex');
    });

    it('should map view state to correct url', function () {
        state = $state.get('domainExpert-machines-view');
        expect(state.url).toEqual('/machines/:id');
        expect($state.href(state, { id: 1 })).toEqual('/domainExpert/machines/1');

    });

    it('should map view state to correct template url', function () {
        state = $state.get('domainExpert-machines-view');
        expect(state.templateUrl).toEqual('views/domainExpert/machines/view.html');
    });

    it('should map view state to use the right controller', function () {
        state = $state.get('domainExpert-machines-view');
        expect(state.controller).toEqual('DomainExpertMachinesControllerView');
    });

    it('should map create state to correct url', function () {
        state = $state.get('domainExpert-machines-create');
        expect(state.url).toEqual('/machines/create');
    });

    it('should map create state to correct template url', function () {
        state = $state.get('domainExpert-machines-create');
        expect(state.templateUrl).toEqual('views/domainExpert/machines/create.html');
    });

    it('should map create state to use the right controller', function () {
        state = $state.get('domainExpert-machines-create');
        expect(state.controller).toEqual('DomainExpertMachinesControllerCreate');
    });

});



