describe('DomainExpertIndexControllerIndex', function () {
    var DomainExpertIndexControllerIndex, rootScope, httpBackend, ENV;
    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function($controller,_$rootScope_, _$httpBackend_, _ENV_){
        DomainExpertIndexControllerIndex = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        ENV = _ENV_;
    }));

    it('should exist', function(){
        var controller = DomainExpertIndexControllerIndex('DomainExpertIndexControllerIndex', {$scope: {}});
        expect(controller).toBeDefined();
    });

    it('should filter the inspections correctly', function(){
        var scope = rootScope.$new();
        var controller = DomainExpertIndexControllerIndex('DomainExpertIndexControllerIndex', {$scope: rootScope});
        expect(controller).toBeDefined();

        httpBackend.when('GET', ENV.apiEndpoint + 'inspections?include=machine.model,technician,scheduler').respond([
            {
                timeScheduled: scope.moment().add(1, 'DAYS').valueOf(),
                id: 1
            },
            {
                timeScheduled: scope.moment().add(8, 'DAYS').valueOf(),
                id: 2
            },
            {
                timeScheduled: scope.moment().add(3, 'DAYS').valueOf(),
                id: 3
            },
            {
                timeCompleted:scope.moment().subtract(1, 'DAYS').valueOf(),
                timeScheduled: scope.moment().subtract(1, 'DAYS').valueOf(),
                id: 4
            },
            {
                timeCompleted:scope.moment().subtract(3, 'DAYS').valueOf(),
                timeScheduled: scope.moment().subtract(3, 'DAYS').valueOf(),
                id: 5
            },
            {
                timeCompleted:scope.moment().subtract(6, 'DAYS').valueOf(),
                timeScheduled: scope.moment().subtract(6, 'DAYS').valueOf(),
                id: 6
            },
            {
                timeCompleted:scope.moment().subtract(11, 'DAYS').valueOf(),
                timeScheduled: scope.moment().subtract(11, 'DAYS').valueOf(),
                id: 7
            }
        ]);
        httpBackend.flush();

        expect(scope.upcomingInspections.length).toBe(3);
        expect(expect(scope.upcomingInspections[0].id).toBe(1));
        expect(expect(scope.upcomingInspections[1].id).toBe(2));
        expect(expect(scope.upcomingInspections[2].id).toBe(3));

        expect(scope.recentlyCompletedInspections.length).toBe(3);
        expect(expect(scope.recentlyCompletedInspections[0].id).toBe(4));
        expect(expect(scope.recentlyCompletedInspections[1].id).toBe(5));
        expect(expect(scope.recentlyCompletedInspections[2].id).toBe(6));
    });
});