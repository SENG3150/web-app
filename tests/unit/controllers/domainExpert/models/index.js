describe('DomainExpertModelsControllerIndex', function () {
    var DomainExpertModelsControllerIndex;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller) {
        DomainExpertModelsControllerIndex = $controller;
    }));

    it('should exist', function(){
        var controller = DomainExpertModelsControllerIndex('DomainExpertModelsControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });
});