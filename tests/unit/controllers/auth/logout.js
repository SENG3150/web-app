describe('AuthControllerLogout', function () {
    var AuthControllerLogout;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller) {
        AuthControllerLogout = $controller;
    }));

    it('should exist', function(){
        var controller = AuthControllerLogout('AuthControllerLogout', {$scope: {}});
        expect(controller).toBeDefined();
    });
});