describe('DomainExpertModelsControllerCreate', function () {
    var DomainExpertModelsControllerCreate, rootScope, httpBackend, $state, toastr, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _$state_, _toastr_, _ENV_) {
        DomainExpertModelsControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        $state = _$state_;
        toastr = _toastr_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = DomainExpertModelsControllerCreate('DomainExpertModelsControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsControllerCreate('DomainExpertModelsControllerCreate', {$scope: scope});
        });

        it('should be successful', function() {
            scope.model.name = "abc";
            expect(scope.validate()).toBe(true);
        });

        it('name cannot be null', function() {
            scope.model.name = null;
            expect(scope.validate()).toBe(false);
        });

        it('name cannot be empty', function() {
            scope.model.name = '';
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.submitModel()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertModelsControllerCreate('DomainExpertModelsControllerCreate', {$scope: scope});
        });

        it('should be successfully be submitted', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'models').respond(200, '');
            spyOn($state, 'go');

            scope.model.name = 'abc';
            scope.submitModel();

            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('domainExpert-models-index');
        });

        it('there should be a server error', function() {
            httpBackend.when('POST', ENV.apiEndpoint + 'models').respond(422, '');

            spyOn(toastr, 'error');

            scope.model.name = 'abc';
            scope.submitModel();

            httpBackend.flush();
            expect(toastr.error).toHaveBeenCalledWith('There was an error creating the model.');
        });
    });
});