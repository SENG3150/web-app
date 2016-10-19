describe('AdministratorAdministratorsRoute', function(){

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
        state = $state.get('administrator-administrators-index');
        expect(state.url).toEqual('/administrators');
    });

    it('should map index state  to correct template url', function () {
        state = $state.get('administrator-administrators-index');
        expect(state.templateUrl).toEqual('views/administrator/administrators/index.html');
    });

    it('should map index state to use the right controller', function () {
        state = $state.get('administrator-administrators-index');
        expect(state.controller).toEqual('AdministratorAdministratorsControllerIndex');
    });

    it('should map view state to correct url', function () {
        state = $state.get('administrator-administrators-view');
        expect(state.url).toEqual('/administrators/:id');
        expect($state.href(state, { id: 1 })).toEqual('/administrator/administrators/1');

    });

    it('should map view state to correct template url', function () {
        state = $state.get('administrator-administrators-view');
        expect(state.templateUrl).toEqual('views/administrator/administrators/view.html');
    });

    it('should map view state to use the right controller', function () {
        state = $state.get('administrator-administrators-view');
        expect(state.controller).toEqual('AdministratorAdministratorsControllerView');
    });

    it('should map create state to correct url', function () {
        state = $state.get('administrator-administrators-create');
        expect(state.url).toEqual('/administrators/create');
    });

    it('should map create state to correct template url', function () {
        state = $state.get('administrator-administrators-create');
        expect(state.templateUrl).toEqual('views/administrator/administrators/create.html');
    });

    it('should map create state to use the right controller', function () {
        state = $state.get('administrator-administrators-create');
        expect(state.controller).toEqual('AdministratorAdministratorsControllerCreate');
    });

});



