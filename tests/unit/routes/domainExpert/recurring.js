describe('DomainExpertsRecurringRoute', function(){

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
        state = $state.get('domainExpert-recurring-index');
        expect(state.url).toEqual('/recurring');
    });

    it('should map index state  to correct template url', function () {
        state = $state.get('domainExpert-recurring-index');
        expect(state.templateUrl).toEqual('views/domainExpert/recurring/index.html');
    });

    it('should map index state to use the right controller', function () {
        state = $state.get('domainExpert-recurring-index');
        expect(state.controller).toEqual('DomainExpertRecurringControllerIndex');
    });

    it('should map view state to correct url', function () {
        state = $state.get('domainExpert-recurring-view');
        expect(state.url).toEqual('/recurring/:id');
        expect($state.href(state, { id: 1 })).toEqual('/domainExpert/recurring/1');

    });

    it('should map view state to correct template url', function () {
        state = $state.get('domainExpert-recurring-view');
        expect(state.templateUrl).toEqual('views/domainExpert/recurring/view.html');
    });

    it('should map view state to use the right controller', function () {
        state = $state.get('domainExpert-recurring-view');
        expect(state.controller).toEqual('DomainExpertRecurringControllerView');
    });

    it('should map create state to correct url', function () {
        state = $state.get('domainExpert-recurring-create');
        expect(state.url).toEqual('/recurring/create');
    });

    it('should map create state to correct template url', function () {
        state = $state.get('domainExpert-recurring-create');
        expect(state.templateUrl).toEqual('views/domainExpert/recurring/create.html');
    });

    it('should map create state to use the right controller', function () {
        state = $state.get('domainExpert-recurring-create');
        expect(state.controller).toEqual('DomainExpertRecurringControllerCreate');
    });

});



