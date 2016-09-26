describe('DomainExpertModelsViewMajorAssemblyControllerView', function () {
    var DomainExpertModelsViewMajorAssemblyControllerView, rootScope, httpBackend;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_) {
        DomainExpertModelsViewMajorAssemblyControllerView = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
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

        beforeEach(function () {
            scope = rootScope.$new();
            stateParams = {modelId: 1};
            controller = DomainExpertModelsViewMajorAssemblyControllerView('DomainExpertModelsViewMajorAssemblyControllerView', {$scope: scope, $stateParams: stateParams});
            httpBackend.whenGET('/majorAssemblies', {include: 'model'}).respond({
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
            httpBackend.flush();
        });

        // it('should save', function() {
        //     httpBackend.when('POST', '/majorAssemblies').respond(200, '');
        //     spyOn(scope.majorAssembly, 'post').and.callThrough();
        //
        //     scope.majorAssembly.name = 'major 1';
        //     scope.save();
        //     expect(scope.majorAssembly.post).toHaveBeenCalled();
        // });

        // it('should fail due to no name', function() {
        //     //httpBackend.when('GET', '/majorAssemblies?include=model').respond({name: 'default', id: 2});
        //     //scope.$apply();
        //     spyOn(scope.majorAssembly, 'post').and.callThrough();
        //
        //     scope.majorAssembly.name = '';
        //     scope.save();
        //
        //     expect(scope.majorAssembly.post).not.toHaveBeenCalled();
        // });
    });
});