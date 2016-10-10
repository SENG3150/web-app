describe('DomainExpertMachinesControllerCreate', function () {
    var DomainExpertMachinesControllerCreate, rootScope, httpBackend, $state, Machines, toastr, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _$state_, _Machines_, _toastr_, _ENV_) {
        DomainExpertMachinesControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        $state = _$state_;
        Machines = _Machines_;
        toastr = _toastr_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = DomainExpertMachinesControllerCreate('DomainExpertMachinesControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.validate()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertMachinesControllerCreate('DomainExpertMachinesControllerCreate', {$scope: scope});
        });

        it('should be successful', function() {
            scope.machine.name = 'abc';
            scope.machine.model.id = 1;
            expect(scope.validate()).toBe(true);
        });

        it('name cannot be null', function() {
            scope.machine.name = null;
            scope.machine.model.id = 1;
            expect(scope.validate()).toBe(false);
        });

        it('name cannot be empty', function() {
            scope.machine.name = '';
            scope.machine.model.id = 1;
            expect(scope.validate()).toBe(false);
        });

        it('model id cannot be empty', function() {
            scope.machine.name = 'abc';
            scope.machine.model.id = '';
            expect(scope.validate()).toBe(false);
        });

        it('model id cannot be null', function() {
            scope.machine.name = 'abc';
            scope.machine.model.id = null;
            expect(scope.validate()).toBe(false);
        });
    });

    describe('.setModel()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertMachinesControllerCreate('DomainExpertMachinesControllerCreate', {$scope: scope});
        });

        it('should successfully update the model', function () {
            var model = {
                name: 'testing',
                id: '99'
            };

            scope.setModel(model);

            expect(scope.machine.model.name).toBe(model.name);
            expect(scope.machine.model.id).toBe(model.id);

            expect(scope.selectedModel.name).toBe(model.name);
            expect(scope.selectedModel.id).toBe(model.id);
        });
    });

    describe('.submitMachine()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertMachinesControllerCreate('DomainExpertMachinesControllerCreate', {$scope: scope});
        });

        it('should be successfully be submitted', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'models').respond([{id: 1, name: 'abc'}]);
            httpBackend.when('POST', ENV.apiEndpoint + 'machines').respond(200, '');
            spyOn($state, 'go');
        
            scope.machine.name = 'abc';
            scope.machine.model.id = 1;
            scope.submitMachine();

            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('domainExpert-machines-index');
        });

        it('there should be a server error', function() {
            httpBackend.when('GET', ENV.apiEndpoint + 'models').respond([{id: 1, name: 'abc'}]);
            httpBackend.when('POST', ENV.apiEndpoint + 'machines').respond(422, '');

            spyOn(toastr, 'error');

            scope.machine.name = 'abc';
            scope.machine.model.id = 1;
            scope.submitMachine();

            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalled();
        });
    });
});