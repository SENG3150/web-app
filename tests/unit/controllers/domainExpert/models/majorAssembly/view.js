describe('DomainExpertModelsViewMajorAssemblyControllerView', function () {
    var DomainExpertModelsViewMajorAssemblyControllerView, rootScope, httpBackend, $state, toastr, ENV, AuthService;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _$state_, _toastr_, _ENV_, _AuthService_) {
        DomainExpertModelsViewMajorAssemblyControllerView = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        $state = _$state_;
        toastr = _toastr_;
        ENV = _ENV_;
        AuthService = _AuthService_;
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
        var scope, controller;

        beforeEach(inject(function ($q) {
            scope = rootScope.$new();
            controller = DomainExpertModelsViewMajorAssemblyControllerView('DomainExpertModelsViewMajorAssemblyControllerView', {$scope: scope});
            
            httpBackend.when('GET', ENV.apiEndpoint + 'majorAssemblies?include=model').respond({
                "id": 1,
                "name": "Hoist System (HST)",
                "model": {
                    "id": 1,
                    "name": "4100 XPC-AC Shovel"
                }
            });
            httpBackend.flush();
            
            //fake that the user is logged in
            spyOn(AuthService, 'checkPermissions').and.returnValue(true);
        }));

        it('should save', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'majorAssemblies/' + scope.majorAssembly.id).respond(200, '');
            spyOn($state, 'go');

            scope.modelId = 10;
            scope.save();
            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('domainExpert-models-view', {id: scope.modelId});
        });

        it('should fail due to a server error', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'majorAssemblies/' + scope.majorAssembly.id).respond(422, '');
            spyOn(toastr, 'error');

            scope.save();
            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error updating the major assembly name.');
        });

        it('should fail due to no name', function() {
            spyOn(toastr, 'error');

            scope.majorAssembly.name = '';
            scope.save();

            expect(toastr.error).toHaveBeenCalledWith('Enter a major assembly name.');
        });

        it('should fail due to a null name', function() {
            spyOn(toastr, 'error');

            scope.majorAssembly.name = null;
            scope.save();

            expect(toastr.error).toHaveBeenCalledWith('Enter a major assembly name.');
        });
    });
});