describe('DomainExpertInspectionsRoute', function(){

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
        state = $state.get('domainExpert-inspections-index');
        expect(state.url).toEqual('/inspections');
    });

    it('should map index state  to correct template url', function () {
        state = $state.get('domainExpert-inspections-index');
        expect(state.templateUrl).toEqual('views/domainExpert/inspections/index.html');
    });

    it('should map index state to use the right controller', function () {
        state = $state.get('domainExpert-inspections-index');
        expect(state.controller).toEqual('DomainExpertInspectionsControllerIndex');
    });

    it('should map view state to correct url', function () {
        state = $state.get('domainExpert-inspections-view');
        expect(state.url).toEqual('/inspections/:id');
        expect($state.href(state, { id: 1 })).toEqual('/domainExpert/inspections/1');

    });

    it('should map view state to correct template url', function () {
        state = $state.get('domainExpert-inspections-view');
        expect(state.templateUrl).toEqual('views/domainExpert/inspections/view.html');
    });

    it('should map view state to use the right controller', function () {
        state = $state.get('domainExpert-inspections-view');
        expect(state.controller).toEqual('DomainExpertInspectionsControllerView');
    });

    it('should map create state to correct url', function () {
        state = $state.get('domainExpert-inspections-create');
        expect(state.url).toEqual('/inspections/create');
    });

    it('should map create state to correct template url', function () {
        state = $state.get('domainExpert-inspections-create');
        expect(state.templateUrl).toEqual('views/domainExpert/inspections/create.html');
    });

    it('should map create state to use the right controller', function () {
        state = $state.get('domainExpert-inspections-create');
        expect(state.controller).toEqual('DomainExpertInspectionsControllerCreate');
    });


    it('should map create state to correct url', function () {
        state = $state.get('domainExpert-inspections-report');
        expect(state.url).toEqual('/inspections/:id/report');
        expect($state.href(state, { id: 1 })).toEqual('/domainExpert/inspections/1/report');
    });

    it('should map create state to correct template url', function () {
        state = $state.get('domainExpert-inspections-report');
        expect(state.templateUrl).toEqual('views/domainExpert/inspections/report.html');
    });

    it('should map create state to use the right controller', function () {
        state = $state.get('domainExpert-inspections-report');
        expect(state.controller).toEqual('DomainExpertInspectionsControllerReport');
    });

});



