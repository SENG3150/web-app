describe('DomainExpertIndexControllerIndex', function () {
    var DomainExpertIndexControllerIndex;
    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function($controller){
        DomainExpertIndexControllerIndex = $controller;
    }));

    it('should exist', function(){
        var controller = DomainExpertIndexControllerIndex('DomainExpertIndexControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });
});