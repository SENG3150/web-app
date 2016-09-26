describe('DomainExpertInspectionsControllerCreate', function () {
    var DomainExpertInspectionsControllerCreate, rootScope, httpBackend, AuthService;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _AuthService_) {
        DomainExpertInspectionsControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        AuthService = _AuthService_;
    }));

    // it('should exist', function(){
    //     var controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: rootScope.$new()});
    //     expect(controller).toBeDefined();
    // });

    describe('.checkLoading()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        // it('should return true input (t,t)', function() {
        //     scope.loadingMachines = true;
        //     scope.loadingTechnicians = true;
        //
        //     expect(scope.checkLoading()).toBe(true);
        // });
    });
});