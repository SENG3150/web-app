describe('DomainExpertInspectionsControllerReport', function () {
    var DomainExpertInspectionsControllerReport, rootScope, httpBackend, AuthService, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _AuthService_, _ENV_) {
        DomainExpertInspectionsControllerReport = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        AuthService = _AuthService_;
        ENV = _ENV_;
    }));

    describe('graph creation', function() {

        it('oil graphs generate correctly ( .createTimeLineGraph() )', function () {
            var scope = rootScope.$new();
            var controller = DomainExpertInspectionsControllerReport('DomainExpertInspectionsControllerReport', {$scope: scope});
            expect(controller).toBeDefined();

            var inspection = {
                majorAssemblies: [
                    {
                        id: 1,
                        subAssemblies: [
                            {
                                id: 25,
                                name: 'test',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    }
                ]
            };

            var graphData = {
                subAssemblies: [
                    {
                        id: 25,
                        name: 'test',
                        oilTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            id: 1,
                            lead: 1,
                            copper: 2,
                            tin: 3,
                            iron: 4,
                            pq90: 5,
                            silicon: 6,
                            sodium: 7,
                            aluminium: 8,
                            water: 9.5,
                            viscosity: 10,
                        }],
                        wearTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            smu: 0,
                            uniqueDetails: {"Field 1": "Value 1", "Field 2": "Value 2"}
                        }]
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + 'inspections?include=majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly').respond(inspection);
            httpBackend.when('GET', ENV.apiEndpoint + 'inspections/graphs').respond(graphData);
            httpBackend.flush();

            var graphResult = scope.inspection.majorAssemblies[0].subAssemblies[0].oilTestGraphs[1];
            var actualResult = {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: graphData.subAssemblies[0].name + ' - Oil Test'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        millisecond: '%e. %b',
                        second: '%e. %b',
                        minute: '%e. %b',
                        hour: '%e. %b',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%e. %b',
                        year: '%e. %b'
                    }
                },
                yAxis: {},
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                series: [
                    {
                        name: 'Iron (Fe)',
                        data: [
                            [1472184000000, 4]
                        ]
                    },
                    {
                        name: 'PQ90',
                        data: [
                            [1472184000000, 5]
                        ]
                    }
                ]
            };
            expect(JSON.stringify(graphResult)).toBe(JSON.stringify(actualResult));
        });

        it('wear graphs generate correctly ( .createWearGraph() )', function () {
            var scope = rootScope.$new();
            var controller = DomainExpertInspectionsControllerReport('DomainExpertInspectionsControllerReport', {$scope: scope});
            expect(controller).toBeDefined();

            var inspection = {
                majorAssemblies: [
                    {
                        id: 1,
                        subAssemblies: [
                            {
                                id: 25,
                                name: 'test',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    }
                ]
            };

            var graphData = {
                subAssemblies: [
                    {
                        id: 25,
                        name: 'test',
                        oilTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            id: 1,
                            lead: 1,
                            copper: 2,
                            tin: 3,
                            iron: 4,
                            pq90: 5,
                            silicon: 6,
                            sodium: 7,
                            aluminium: 8,
                            water: 9.5,
                            viscosity: 10,
                        }],
                        wearTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            smu: 10,
                            uniqueDetails: {"Field 1": "Value 1", "Field 2": "Value 2"}
                        }]
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + 'inspections?include=majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly').respond(inspection);
            httpBackend.when('GET', ENV.apiEndpoint + 'inspections/graphs').respond(graphData);
            httpBackend.flush();

            var graphResult = scope.inspection.majorAssemblies[0].subAssemblies[0].wearTestGraphs[0];

            var actualResult = {
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        millisecond: '%e. %b',
                        second: '%e. %b',
                        minute: '%e. %b',
                        hour: '%e. %b',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%e. %b',
                        year: '%e. %b'
                    }
                },
                yAxis: {
                    title: {
                        text: 'SMU'
                    }
                },
                title: {
                    text: graphData.subAssemblies[0].name + ' - Wear Test'
                },
                legend: {
                    enabled: false
                },
                series: [{
                    type: 'line',
                    data: [[1472184000000, 10]],
                    marker: {
                        radius: 4
                    }
                }]
            };

            expect(JSON.stringify(graphResult)).toBe(JSON.stringify(actualResult));
        });

        it('should correctly create 4 oil test graphs and 1 wear test graph for a single sub assembly', function () {
            var scope = rootScope.$new();
            var controller = DomainExpertInspectionsControllerReport('DomainExpertInspectionsControllerReport', {$scope: scope});
            expect(controller).toBeDefined();


            var inspection = {
                majorAssemblies: [
                    {
                        id: 1,
                        subAssemblies: [
                            {
                                id: 25,
                                name: 'test',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    }
                ]
            };

            var graphData = {
                subAssemblies: [
                    {
                        id: 25,
                        name: 'test',
                        oilTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            id: 1,
                            lead: 1,
                            copper: 2,
                            tin: 3,
                            iron: 4,
                            pq90: 5,
                            silicon: 6,
                            sodium: 7,
                            aluminium: 8,
                            water: 9.5,
                            viscosity: 10,
                        }],
                        wearTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            smu: 0,
                            uniqueDetails: {"Field 1": "Value 1", "Field 2": "Value 2"}
                        }]
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + 'inspections?include=majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly').respond(inspection);
            httpBackend.when('GET', ENV.apiEndpoint + 'inspections/graphs').respond(graphData);
            httpBackend.flush();

            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].oilTestGraphs.length).toBe(4);
            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].wearTestGraphs.length).toBe(1);
        });

        it('should create 4 oil tests graphs and 0 wear test graphs', function () {
            var scope = rootScope.$new();
            var controller = DomainExpertInspectionsControllerReport('DomainExpertInspectionsControllerReport', {$scope: scope});
            expect(controller).toBeDefined();

            var inspection = {
                majorAssemblies: [
                    {
                        id: 1,
                        subAssemblies: [
                            {
                                id: 25,
                                name: 'test',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    }
                ]
            };

            var graphData = {
                subAssemblies: [
                    {
                        id: 25,
                        name: 'test',
                        oilTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            id: 1,
                            lead: 1,
                            copper: 2,
                            tin: 3,
                            iron: 4,
                            pq90: 5,
                            silicon: 6,
                            sodium: 7,
                            aluminium: 8,
                            water: 9.5,
                            viscosity: 10,
                        }],
                        wearTests: []
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + 'inspections?include=majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly').respond(inspection);
            httpBackend.when('GET', ENV.apiEndpoint + 'inspections/graphs').respond(graphData);
            httpBackend.flush();

            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].oilTestGraphs.length).toBe(4);
            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].wearTestGraphs.length).toBe(0);
        });

        it('should create 0 oil tests graphs and 1 wear test graphs', function () {
            var scope = rootScope.$new();
            var controller = DomainExpertInspectionsControllerReport('DomainExpertInspectionsControllerReport', {$scope: scope});
            expect(controller).toBeDefined();

            var inspection = {
                majorAssemblies: [
                    {
                        id: 1,
                        subAssemblies: [
                            {
                                id: 25,
                                name: 'test',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    }
                ]
            };

            var graphData = {
                subAssemblies: [
                    {
                        id: 25,
                        name: 'test',
                        oilTests: [],
                        wearTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            smu: 0,
                            uniqueDetails: {"Field 1": "Value 1", "Field 2": "Value 2"}
                        }]
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + 'inspections?include=majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly').respond(inspection);
            httpBackend.when('GET', ENV.apiEndpoint + 'inspections/graphs').respond(graphData);
            httpBackend.flush();

            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].oilTestGraphs.length).toBe(0);
            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].wearTestGraphs.length).toBe(1);
        });

        it('3 sub assemblies, 2 sub assemblies have 4 oil test graphs and 1 wear test graph, and the 3rd sub assembly has no graphs', function () {
            var scope = rootScope.$new();
            var controller = DomainExpertInspectionsControllerReport('DomainExpertInspectionsControllerReport', {$scope: scope});
            expect(controller).toBeDefined();

            var inspection = {
                majorAssemblies: [
                    {
                        id: 1,
                        subAssemblies: [
                            {
                                id: 25,
                                name: 'test 1',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        subAssemblies: [
                            {
                                id: 35,
                                name: 'test 2',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    },
                    {
                        id: 3,
                        subAssemblies: [
                            {
                                id: 55,
                                name: 'test 3',
                                oilTestGraphs: [],
                                wearTestGraphs: []
                            }
                        ]
                    }
                ]
            };

            var graphData = {
                subAssemblies: [
                    {
                        id: 25,
                        name: 'test 1',
                        oilTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            id: 1,
                            lead: 1,
                            copper: 2,
                            tin: 3,
                            iron: 4,
                            pq90: 5,
                            silicon: 6,
                            sodium: 7,
                            aluminium: 8,
                            water: 9.5,
                            viscosity: 10,
                        }],
                        wearTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            smu: 0,
                            uniqueDetails: {"Field 1": "Value 1", "Field 2": "Value 2"}
                        }]
                    },
                    {
                        id: 35,
                        name: 'test 2',
                        oilTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            id: 1,
                            lead: 1,
                            copper: 2,
                            tin: 3,
                            iron: 4,
                            pq90: 5,
                            silicon: 6,
                            sodium: 7,
                            aluminium: 8,
                            water: 9.5,
                            viscosity: 10,
                        }],
                        wearTests: [{
                            timeCompleted: "2016-08-26T14:00:00+1000",
                            smu: 0,
                            uniqueDetails: {"Field 1": "Value 1", "Field 2": "Value 2"}
                        }]
                    },
                    {
                        id: 55,
                        oilTests: [],
                        wearTests: []
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + 'inspections?include=majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly').respond(inspection);
            httpBackend.when('GET', ENV.apiEndpoint + 'inspections/graphs').respond(graphData);
            httpBackend.flush();

            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].oilTestGraphs.length).toBe(4);
            expect(scope.inspection.majorAssemblies[0].subAssemblies[0].wearTestGraphs.length).toBe(1);

            expect(scope.inspection.majorAssemblies[1].subAssemblies[0].oilTestGraphs.length).toBe(4);
            expect(scope.inspection.majorAssemblies[1].subAssemblies[0].wearTestGraphs.length).toBe(1);

            expect(scope.inspection.majorAssemblies[2].subAssemblies[0].oilTestGraphs.length).toBe(0);
            expect(scope.inspection.majorAssemblies[2].subAssemblies[0].wearTestGraphs.length).toBe(0);
        });
    });
});