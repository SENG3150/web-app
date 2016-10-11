describe('DomainExpertInspectionsControllerCreate', function () {
    var DomainExpertInspectionsControllerCreate, rootScope, httpBackend, AuthService;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _AuthService_) {
        DomainExpertInspectionsControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        AuthService = _AuthService_;

        //allow us to fake a user being logged in
        spyOn(AuthService, 'getUser').and.returnValue({
            primary: {
                id: 10
            }
        });
    }));

    it('should exist', function(){
        var controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: rootScope.$new()});
        expect(controller).toBeDefined();
    });

    describe('.checkLoading()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        it('should still be loading for input (t,t)', function() {
            scope.loadingMachines = true;
            scope.loadingTechnicians = true;
            scope.checkLoading();
            expect(scope.loading).toBe(true);
        });

        it('should still be loading for input (f,t)', function() {
            scope.loadingMachines = false;
            scope.loadingTechnicians = true;
            scope.checkLoading();
            expect(scope.loading).toBe(true);
        });

        it('should still be loading for input (t,f)', function() {
            scope.loadingMachines = true;
            scope.loadingTechnicians = false;
            scope.checkLoading();
            expect(scope.loading).toBe(true);
        });

        it('should no longer be loading for input (f, f)', function() {
            scope.loadingMachines = false;
            scope.loadingTechnicians = false;
            scope.checkLoading();
            expect(scope.loading).toBe(false);
        });
    });

    describe('.updateScheduledTests()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });
    });

    describe('.setMachine()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });
    });

    describe('.setTechnician()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        it('it should correctly set the technician', function() {
            var technician = {
                id: 578,
                name: 'test name',
                type: 'technician'
            };

            scope.setTechnician(technician);

            expect(scope.selectedTechnician).toBe(technician);
            expect(scope.inspection.technician).toBe(technician.id);
        });
    });

    describe('.toggleMajorAssembly()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        it('it should correctly toggle major assemblies', function() {
            scope.inspection.selectedMajorAssemblies = {};
        });
    });

    describe('.toggleSubAssembly()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });
    });

    describe('.save()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });
    });
});