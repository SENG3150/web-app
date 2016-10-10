describe('DomainExpertRecurringControllerIndex', function () {
    var DomainExpertRecurringControllerIndex, rootScope, httpBackend, $state, toastr, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_,  _$state_, _toastr_, _ENV_) {
        DomainExpertRecurringControllerIndex = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        $state = _$state_;
        toastr = _toastr_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = DomainExpertRecurringControllerIndex('DomainExpertRecurringControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.delete()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertRecurringControllerIndex('DomainExpertRecurringControllerIndex', {$scope: scope});
        });

        it('should successfully delete a inspection schedule', inject(function($q) {
            var deferred = $q.defer();
            httpBackend.when('DELETE', ENV.apiEndpoint + 'inspectionSchedules').respond(200, '');
            //spyOn($confirm).and.returnValue(deferred.promise);
            spyOn($state, 'reload');

            scope.delete(5);
            deferred.resolve();
            //expect($state.reload).toHaveBeenCalled();
        }));

        it('should fail to delete a inspection schedule', inject(function($q) {
            var deferred = $q.defer();
            httpBackend.when('DELETE', ENV.apiEndpoint + 'inspectionSchedules').respond(200, '');
            //spyOn($confirm).and.returnValue(deferred.promise);
            spyOn(toastr, 'error');

            scope.delete(5);
            deferred.reject();
            //expect(toastr.error).toHaveBeenCalledWith('There was an error deleting the recurring inspection.');
        }));
    });
});