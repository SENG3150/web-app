describe('DomainExpertModelsRoute', function(){

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
        state = $state.get('domainExpert-models-index');
        expect(state.url).toEqual('/models');
    });

    it('should map index state  to correct template url', function () {
        state = $state.get('domainExpert-models-index');
        expect(state.templateUrl).toEqual('views/domainExpert/models/index.html');
    });

    it('should map index state to use the right controller', function () {
        state = $state.get('domainExpert-models-index');
        expect(state.controller).toEqual('DomainExpertModelsControllerIndex');
    });

    it('should map view state to correct url', function () {
        state = $state.get('domainExpert-models-view');
        expect(state.url).toEqual('/models/view/:id');
        expect($state.href(state, { id: 1 })).toEqual('/domainExpert/models/view/1');

    });

    it('should map view state to correct template url', function () {
        state = $state.get('domainExpert-models-view');
        expect(state.templateUrl).toEqual('views/domainExpert/models/view.html');
    });

    it('should map view state to use the right controller', function () {
        state = $state.get('domainExpert-models-view');
        expect(state.controller).toEqual('DomainExpertModelsControllerView');
    });

    it('should map create state to correct url', function () {
        state = $state.get('domainExpert-models-create');
        expect(state.url).toEqual('/models/create');
    });

    it('should map create state to correct template url', function () {
        state = $state.get('domainExpert-models-create');
        expect(state.templateUrl).toEqual('views/domainExpert/models/create.html');
    });

    it('should map create state to use the right controller', function () {
        state = $state.get('domainExpert-models-create');
        expect(state.controller).toEqual('DomainExpertModelsControllerCreate');
    });

});



