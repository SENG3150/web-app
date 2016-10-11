describe('DomainExpertModelsViewMajorAssemblyControllerView', function () {
    var DomainExpertModelsViewMajorAssemblyControllerView, rootScope, httpBackend,$state, toastr, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _$state_, _toastr_, _ENV_) {
        DomainExpertModelsViewMajorAssemblyControllerView = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        $state = _$state_;
        toastr = _toastr_;
        ENV = _ENV_;
        httpBackend.when('GET', 'http://seng3150.api.local/majorAssemblies').respond({
            "id": 1,
            "name": "Hoist System (HST)",
            "model": {
                "id": 1,
                "name": "4100 XPC-AC Shovel"
            },
            "route": "majorAssemblies",
            "reqParams": {
                "include": "model"
            },
            "restangularized": true,
            "fromServer": true,
            "parentResource": null,
            "restangularCollection": false
        });
    }));

    it('should exist', function(){
        var controller = DomainExpertModelsViewMajorAssemblyControllerView('DomainExpertModelsViewMajorAssemblyControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewMajorAssemblyControllerView('DomainExpertModelsViewMajorAssemblyControllerView', {$scope: scope});
        });

        it('should be successful', function() {
            scope.majorAssembly = {name: 'abc', id: 2};
            expect(scope.validate()).toBe(true);
        });

        it('name cannot be null', function() {
            scope.majorAssembly = {name: null, id: 2};
            expect(scope.validate()).toBe(false);
        });

        it('name cannot be empty', function() {
            scope.majorAssembly = {name: '', id: 2};
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.save()', function() {
        var scope, controller, stateParams;

        beforeEach(inject(function ($q) {
            scope = rootScope.$new();
            stateParams = {modelId: 1};
            controller = DomainExpertModelsViewMajorAssemblyControllerView('DomainExpertModelsViewMajorAssemblyControllerView', {$scope: scope, $stateParams: stateParams});

        }));

        it('should save', function() {
            // httpBackend.when('POST', 'http://seng3150.api.local/majorAssemblies').respond(200, '');
            // spyOn($state, 'go');
            //
            // scope.save();
            // httpBackend.flush();
            // expect($state.go).toHaveBeenCalledWith('domainExpert-models-view', {id: $scope.modelId});

        });

        it('should fail due to no name', function() {
            // httpBackend.when('GET', 'http://seng3150.api.local/majorAssemblies').respond({name: 'default', id: 2});
            // spyOn(toastr, 'error');
            //
            // scope.majorAssembly.name = '';
            // scope.save();
            //
            // expect(toastr.error).toHaveBeenCalledWith('There was an error updating the major assembly name.');
        });
    });
});