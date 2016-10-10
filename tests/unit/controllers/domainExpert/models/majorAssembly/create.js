describe('DomainExpertModelsViewMajorAssemblyControllerCreate', function () {
    var createController, rootScope, httpBackend, Models, MajorAssemblies, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _Models_, _MajorAssemblies_, _ENV_) {
        createController = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        Models = _Models_;
        MajorAssemblies = _MajorAssemblies_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = createController('DomainExpertModelsViewMajorAssemblyControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = createController('DomainExpertModelsViewMajorAssemblyControllerCreate', {$scope: scope});
        });

        it('should be successful', function() {
            scope.majorAssembly.name = 'abc';
            expect(scope.validate()).toBe(true);
        });

        it('name cannot be null', function() {
            scope.majorAssembly.name = null;
            expect(scope.validate()).toBe(false);
        });

        it('name cannot be empty', function() {
            scope.majorAssembly.name = '';
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.save()', function() {
        var scope, controller, stateParams;

        beforeEach(function () {
            scope = rootScope.$new();
            stateParams = {modelId: 1};
            controller = createController('DomainExpertModelsViewMajorAssemblyControllerCreate', {$scope: scope, $stateParams: stateParams});
        });

        it('should save', function() {
            httpBackend.when('POST', ENV.apiEndpoint + '/majorAssemblies').respond(200, '');
            spyOn(MajorAssemblies, 'post').and.callThrough();

            scope.majorAssembly = {
                name: 'major 1'
            };
            scope.save();

            expect(MajorAssemblies.post).toHaveBeenCalled();
        });

        it('should fail due to no name', function() {
            httpBackend.when('POST', ENV.apiEndpoint + '/majorAssemblies').respond(200, '');
            spyOn(MajorAssemblies, 'post').and.callThrough();

            scope.majorAssembly = {
                name: '',
                machineGeneral: false,
                oil: false,
                wear: false,
                uniqueDetails: []
            };
            scope.save();

            expect(MajorAssemblies.post).not.toHaveBeenCalled();
        });
    });
});