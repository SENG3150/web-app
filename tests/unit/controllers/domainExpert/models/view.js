describe('DomainExpertModelsControllerView', function () {
    var DomainExpertModelsControllerView;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller) {
        DomainExpertModelsControllerView = $controller;
    }));

    it('should exist', function(){
        var controller = DomainExpertModelsControllerView('DomainExpertModelsControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });
});