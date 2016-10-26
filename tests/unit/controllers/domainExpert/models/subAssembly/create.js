describe('DomainExpertModelsViewSubAssemblyControllerCreate', function () {
    var DomainExpertModelsViewSubAssemblyControllerCreate, rootScope, httpBackend, Models, SubAssemblies, ENV, $state, toastr;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _Models_, _SubAssemblies_, _ENV_, _$state_, _toastr_) {
        DomainExpertModelsViewSubAssemblyControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        Models = _Models_;
        SubAssemblies = _SubAssemblies_;
        ENV = _ENV_;
        $state = _$state_;
        toastr = _toastr_;
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
            spyOn(toastr, 'error');
            scope.subAssembly.name = null;
            expect(scope.validate()).toBe(false);
            expect(toastr.error).toHaveBeenCalledWith('Enter sub assembly name.');
        });

        it('name cannot be empty', function() {
            spyOn(toastr, 'error');
            scope.subAssembly.name = '';
            expect(scope.validate()).toBe(false);
            expect(toastr.error).toHaveBeenCalledWith('Enter sub assembly name.');
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
            controller = DomainExpertModelsViewSubAssemblyControllerCreate('DomainExpertModelsViewSubAssemblyControllerCreate', {$scope: scope});
        });

        it('should save', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'models').respond(422, '');

            httpBackend.when('POST', ENV.apiEndpoint + 'subAssemblies').respond(200, '');
            spyOn($state, 'go');

            scope.modelId = 50;
            scope.subAssembly = {
                name: 'sub 1',
                machineGeneral: false,
                oil: false,
                wear: false,
                uniqueDetails: []
            };
            scope.save();
            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('domainExpert-models-view', {id: scope.modelId});
        });

        it('should fail to save due to a server error', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'models').respond(422, '');

            httpBackend.when('POST', ENV.apiEndpoint + 'subAssemblies').respond(422, '');
            spyOn(toastr, 'error');

            scope.modelId = 50;
            scope.subAssembly = {
                name: 'sub 1',
                machineGeneral: false,
                oil: false,
                wear: false,
                uniqueDetails: []
            };
            scope.save();
            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error creating the sub assembly.');
        });

        it('should fail due to no name', function() {
            spyOn(toastr, 'error');

            scope.subAssembly = {
                name: '',
                machineGeneral: false,
                oil: false,
                wear: false,
                uniqueDetails: []
            };
            scope.save();

            expect(toastr.error).toHaveBeenCalledWith('Enter sub assembly name.');
        });

        it('should fail due to name being null', function() {
            httpBackend.when('POST', ENV.apiEndpoint + '/subAssemblies').respond(200, '');
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