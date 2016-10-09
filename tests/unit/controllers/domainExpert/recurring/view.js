describe('DomainExpertRecurringControllerView', function () {
    var DomainExpertRecurringControllerView;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller) {
        DomainExpertRecurringControllerView = $controller;
    }));

    it('should exist', function(){
        var controller = DomainExpertRecurringControllerView('DomainExpertRecurringControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });
});