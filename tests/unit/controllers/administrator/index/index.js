describe('AdministratorIndexControllerIndex', function() {
    var AdministratorIndexControllerIndex;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function($controller) {
        AdministratorIndexControllerIndex = $controller;
    }));

    it('should exist', function() {
        var controller = AdministratorIndexControllerIndex('AdministratorIndexControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });

});