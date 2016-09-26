describe('DomainExpertModelsViewSubAssemblyControllerView', function () {
    var DomainExpertModelsViewSubAssemblyControllerView, rootScope, httpBackend;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_) {
        DomainExpertModelsViewSubAssemblyControllerView = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
    }));

    it('should exist', function(){
        var controller = DomainExpertModelsViewSubAssemblyControllerView('DomainExpertModelsViewSubAssemblyControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });
    
    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewSubAssemblyControllerView('DomainExpertModelsViewSubAssemblyControllerView', {$scope: scope});
        });

        it('should be successful', function() {
            scope.subAssembly = {name: 'abc'};
            expect(scope.validate()).toBe(true);
        });

        it('name cannot be null', function() {
            scope.subAssembly = {name: null};
            expect(scope.validate()).toBe(false);
        });

        it('name cannot be empty', function() {
            scope.subAssembly = {name: ''};
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.addUniqueDetail()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewSubAssemblyControllerView('DomainExpertModelsViewSubAssemblyControllerView', {$scope: scope});
        });

        it('should add a single unique detail', function() {
            scope.addUniqueDetail();
            expect(scope.uniqueDetails.length).toBe(1);
        });

        it('should add two unique details', function() {
            scope.addUniqueDetail();
            scope.addUniqueDetail();
            expect(scope.uniqueDetails.length).toBe(2);
        });

        it('should make the unique details array empty', function() {
            scope.addUniqueDetail();
            scope.removeUniqueDetail(0);
            expect(scope.uniqueDetails.length).toBe(0);
        });

        it('should remove 1 unique details from a list of 3', function() {
            scope.addUniqueDetail();
            scope.addUniqueDetail();
            scope.addUniqueDetail();
            scope.removeUniqueDetail(1);
            expect(scope.uniqueDetails.length).toBe(2);
        });
    });
});