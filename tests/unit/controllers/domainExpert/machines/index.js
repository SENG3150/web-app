describe('DomainExpertMachinesControllerIndex', function () {
    var DomainExpertMachinesControllerIndex;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller) {
        DomainExpertMachinesControllerIndex = $controller;
    }));

    it('should exist', function(){
        var controller = DomainExpertMachinesControllerIndex('DomainExpertMachinesControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });
});