describe('DomainExpertMachinesControllerIndex', function () {
    var DomainExpertMachinesControllerIndex, rootScope, httpBackend, $state, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _$state_, _ENV_) {
        DomainExpertMachinesControllerIndex = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        $state = _$state_;
        ENV = _ENV_;
    }));

    it('should exist', function() {
        var controller = DomainExpertMachinesControllerIndex('DomainExpertMachinesControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });
});