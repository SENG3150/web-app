describe('DomainExpertMachinesControllerView', function () {
    var DomainExpertMachinesControllerView, rootScope;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller,_$rootScope_) {
        DomainExpertMachinesControllerView = $controller;
        rootScope = _$rootScope_;
    }));

    // fails due to 'addEventListener' of null
    // it('should exist', function(){
    //     var controller = DomainExpertMachinesControllerView('DomainExpertMachinesControllerView', {$scope: rootScope.$new()});
    //     expect(controller).toBeDefined();
    // });
    //
    // describe('.validate()', function() {
    //     var scope, controller;
    //
    //     beforeEach(function () {
    //         scope = rootScope.$new();
    //         controller = DomainExpertMachinesControllerView('DomainExpertMachinesControllerView', {$scope: scope});
    //     });
    //
    //
    //     it('should return true', function(){
    //         scope.downtime.machine = 10;
    //         scope.cellNames.systemNameCell = '{c: 1, r: 2}';
    //         scope.cellNames.downTimeHoursCell = '{c: 1, r: 2}';
    //         expect(scope.validate()).toBe(true);
    //     });
    //
    //     it('should fail due to a null machine id', function(){
    //         scope.downtime.machine = null;
    //         scope.cellNames.systemNameCell = '{c: 1, r: 2}';
    //         scope.cellNames.downTimeHoursCell = '{c: 1, r: 2}';
    //         expect(scope.validate()).toBe(false);
    //     });
    //
    //     it('should fail due to machine id being not a number', function(){
    //         scope.downtime.machine = 'abc';
    //         scope.cellNames.systemNameCell = '{c: 1, r: 2}';
    //         scope.cellNames.downTimeHoursCell = '{c: 1, r: 2}';
    //         expect(scope.validate()).toBe(false);
    //     });
    //
    //     it('should fail due to systemNameCell being null', function(){
    //         scope.downtime.machine = 10;
    //         scope.cellNames.systemNameCell = null;
    //         scope.cellNames.downTimeHoursCell = '{c: 1, r: 2}';
    //         expect(scope.validate()).toBe(false);
    //     });
    //
    //     it('should fail due to systemNameCell being empty', function(){
    //         scope.downtime.machine = 10;
    //         scope.cellNames.systemNameCell = '';
    //         scope.cellNames.downTimeHoursCell = '{c: 1, r: 2}';
    //         expect(scope.validate()).toBe(false);
    //     });
    //
    //     it('should fail due to downTimeHoursCell being null', function(){
    //         scope.downtime.machine = 'abc';
    //         scope.cellNames.systemNameCell = '{c: 1, r: 2}';
    //         scope.cellNames.downTimeHoursCell = null;
    //         expect(scope.validate()).toBe(false);
    //     });
    //
    //     it('should fail due to downTimeHoursCell being empty', function(){
    //         scope.downtime.machine = 'abc';
    //         scope.cellNames.systemNameCell = '{c: 1, r: 2}';
    //         scope.cellNames.downTimeHoursCell = '';
    //         expect(scope.validate()).toBe(false);
    //     });
    // });
});

