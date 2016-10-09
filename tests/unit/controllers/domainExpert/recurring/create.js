describe('DomainExpertRecurringControllerCreate', function () {
    var DomainExpertRecurringControllerCreate, rootScope, httpBackend, $state, toastr;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_,  _$state_, _toastr_) {
        DomainExpertRecurringControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        $state = _$state_;
        toastr = _toastr_;
    }));

    it('should exist', function(){
        var controller = DomainExpertRecurringControllerCreate('DomainExpertRecurringControllerCreate', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.save()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertRecurringControllerCreate('DomainExpertRecurringControllerCreate', {$scope: scope});
        });

        it('it should fail due to no time period being set', function () {
            scope.inspectionSchedule.value = 0;
            spyOn(toastr, 'warning');
            scope.save();

            expect(toastr.warning).toHaveBeenCalledWith('You must select a value.');
        });

        it('it should fail due to a negative time period being set', function () {
            scope.inspectionSchedule.value = -5;
            spyOn(toastr, 'warning');
            scope.save();

            expect(toastr.warning).toHaveBeenCalledWith('You must select a value.');
        });

        it('it should succeed', function() {
            httpBackend.when('GET', 'http://seng3150.api.local/inspections?include=machine.model').respond([{
                id: 18581,
                model: {
                    name: 'test',
                    id: '12'
                }
            }]);
            httpBackend.when('POST', 'http://seng3150.api.local/inspectionSchedules').respond(200, '');
            scope.inspectionSchedule.value = 5;
            spyOn($state, 'go');
            scope.save();
            httpBackend.flush();
            expect($state.go).toHaveBeenCalledWith('domainExpert-recurring-index');
        });

        it('should be a server error', function() {
            httpBackend.when('GET', 'http://seng3150.api.local/inspections?include=machine.model').respond([{
                id: 18581,
                model: {
                    name: 'test',
                    id: '12'
                }
            }]);
            httpBackend.when('POST', 'http://seng3150.api.local/inspectionSchedules').respond(422, '');
            scope.inspectionSchedule.value = 5;
            spyOn(toastr, 'error');
            scope.save();
            httpBackend.flush();
            expect(toastr.error).toHaveBeenCalledWith('There was an error while creating the recurring inspection.', 'Error');
        });
    });

    describe('.setInspection()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertRecurringControllerCreate('DomainExpertRecurringControllerCreate', {$scope: scope});
        });

        it('should successfully set the inspection', function () {
            var testInspection = {
                id: 18581,
                model: {
                    name: 'test',
                    id: '12'
                }
            };
            scope.setInspection(testInspection);

            expect(scope.selectedInspection).toBe(testInspection);
            expect(scope.inspectionSchedule.inspection).toBe(testInspection.id);
        });
    });
});