describe('AdministratorDomainExpertsControllerIndex', function() {
    var AdministratorDomainExpertsControllerIndex;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function($controller) {
        AdministratorDomainExpertsControllerIndex = $controller;
    }));

    it('should exist', function() {
        var controller = AdministratorDomainExpertsControllerIndex('AdministratorDomainExpertsControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });

});