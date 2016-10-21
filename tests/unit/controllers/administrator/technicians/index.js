describe('AdministratorTechniciansControllerIndex', function() {
    var AdministratorTechniciansControllerIndex;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function($controller) {
        AdministratorTechniciansControllerIndex = $controller;
    }));

    it('should exist', function() {
        var controller = AdministratorTechniciansControllerIndex('AdministratorTechniciansControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });

});