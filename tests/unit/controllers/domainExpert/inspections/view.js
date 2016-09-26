describe('DomainExpertInspectionsControllerView', function () {
    var DomainExpertInspectionsControllerView;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller) {
        DomainExpertInspectionsControllerView = $controller;
    }));

    it('should exist', function(){
        var controller = DomainExpertInspectionsControllerView('DomainExpertInspectionsControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });
});