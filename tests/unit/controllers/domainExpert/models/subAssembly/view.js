describe('DomainExpertModelsViewSubAssemblyControllerView', function () {
    var DomainExpertModelsViewSubAssemblyControllerView, rootScope, httpBackend, ENV, AuthService, $state, toastr;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _ENV_, _AuthService_, _$state_, _toastr_) {
        DomainExpertModelsViewSubAssemblyControllerView = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        ENV = _ENV_;
        AuthService = _AuthService_;
        $state = _$state_;
        toastr = _toastr_;
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

    describe('.removeUniqueDetail()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewSubAssemblyControllerView('DomainExpertModelsViewSubAssemblyControllerView', {$scope: scope});
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
        var scope, controller;

        beforeEach(inject(function ($q) {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewSubAssemblyControllerView('DomainExpertModelsViewSubAssemblyControllerView', {$scope: scope});
            
            httpBackend.when('GET', ENV.apiEndpoint + 'subAssemblies?include=majorAssembly.model').respond({
                id: 1,
                name: "Hoist Ropes - House",
                machineGeneral: true,
                oil: false,
                wear: false,
                uniqueDetails: [],
                majorAssembly: {
                    id: 1,
                    name: "Hoist System (HST)",
                    model: {
                        id: 1,
                        name: "4100 XPC-AC Shovel"
                    }
                }
            });
            httpBackend.flush();
            
            //fake that the user is logged in
            spyOn(AuthService, 'checkPermissions').and.returnValue(true);
        }));

        it('should save', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'subAssemblies/' + scope.subAssembly.id).respond(200, '');
            spyOn($state, 'go');

            scope.modelId = 10;
            scope.save();
            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('domainExpert-models-view', {id: 10});
        });

        it('should fail due to a server error', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'subAssemblies/' + scope.subAssembly.id).respond(422, '');
            spyOn(toastr, 'error');

            scope.save();
            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error updating the sub assembly.');
        });

        it('should fail due to no name', function() {
            spyOn(toastr, 'error');

            scope.subAssembly.name = '';
            scope.save();

            expect(toastr.error).toHaveBeenCalledWith('Enter a sub assembly name.');
        });

        it('should fail due to a null name', function() {
            spyOn(toastr, 'error');

            scope.subAssembly.name = null;
            scope.save();

            expect(toastr.error).toHaveBeenCalledWith('Enter a sub assembly name.');
        });
    });
});