describe('DomainExpertModelsViewSubAssemblyControllerCreate', function () {
    var DomainExpertModelsViewSubAssemblyControllerCreate, rootScope, httpBackend, Models, SubAssemblies;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _Models_, _SubAssemblies_) {
        DomainExpertModelsViewSubAssemblyControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        Models = _Models_;
        SubAssemblies = _SubAssemblies_;
    }));

    it('should exist', function(){
        var controller = DomainExpertModelsViewSubAssemblyControllerCreate('DomainExpertModelsViewSubAssemblyControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewSubAssemblyControllerCreate('DomainExpertModelsViewSubAssemblyControllerCreate', {$scope: scope});
        });

        it('should be successful', function() {
            scope.subAssembly.name = "abc";
            expect(scope.validate()).toBe(true);
        });

        it('name cannot be null', function() {
            scope.subAssembly.name = null;
            expect(scope.validate()).toBe(false);
        });

        it('name cannot be empty', function() {
            scope.subAssembly.name = '';
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.addUniqueDetail()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewSubAssemblyControllerCreate('DomainExpertModelsViewSubAssemblyControllerCreate', {$scope: scope});
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

    describe('.save()', function() {
        var scope, controller, stateParams;

        beforeEach(function () {
            scope = rootScope.$new();
            stateParams = {id: 1, majorAssemblyId: 0};
            controller = DomainExpertModelsViewSubAssemblyControllerCreate('DomainExpertModelsViewSubAssemblyControllerCreate', {$scope: scope, $stateParams: stateParams});
        });

        it('should save', function() {
            httpBackend.when('POST', '/subAssemblies').respond(200, '');
            spyOn(SubAssemblies, 'post').and.callThrough();

            scope.subAssembly = {
                name: 'sub 1',
                machineGeneral: false,
                oil: false,
                wear: false,
                uniqueDetails: []
            };
            scope.save();

            expect(SubAssemblies.post).toHaveBeenCalled();
        });

        it('should fail due to no name', function() {
            httpBackend.when('POST', '/subAssemblies').respond(200, '');
            spyOn(SubAssemblies, 'post').and.callThrough();

            scope.subAssembly = {
                name: '',
                machineGeneral: false,
                oil: false,
                wear: false,
                uniqueDetails: []
            };
            scope.save();

            expect(SubAssemblies.post).not.toHaveBeenCalled();
        });

        it('should fail due to name being null', function() {
            httpBackend.when('POST', '/subAssemblies').respond(200, '');
            spyOn(SubAssemblies, 'post').and.callThrough();

            scope.subAssembly = {
                name: null,
                machineGeneral: false,
                oil: false,
                wear: false,
                uniqueDetails: []
            };
            scope.save();

            expect(SubAssemblies.post).not.toHaveBeenCalled();
        });
    });
});