describe('DomainExpertInspectionsControllerIndex', function () {
    var DomainExpertInspectionsControllerIndex;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller) {
        DomainExpertInspectionsControllerIndex = $controller;
    }));

    it('should exist', function(){
        var controller = DomainExpertInspectionsControllerIndex('DomainExpertInspectionsControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });
});