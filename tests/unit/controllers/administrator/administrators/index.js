describe('AdministratorAdministratorsControllerIndex', function() {
    var AdministratorAdministratorsControllerIndex;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function($controller) {
        AdministratorAdministratorsControllerIndex = $controller;
    }));
    
    it('should exist', function() {
        var controller = AdministratorAdministratorsControllerIndex('AdministratorAdministratorsControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });

});