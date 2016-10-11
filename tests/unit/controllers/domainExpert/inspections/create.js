describe('DomainExpertInspectionsControllerCreate', function () {
    var DomainExpertInspectionsControllerCreate, rootScope, httpBackend, AuthService, $state, toastr, ENV;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _AuthService_, _$state_, _toastr_, _ENV_) {
        DomainExpertInspectionsControllerCreate = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        AuthService = _AuthService_;
        $state = _$state_;
        toastr = _toastr_;
        ENV = _ENV_;

        //allow us to fake a user being logged in
        spyOn(AuthService, 'getUser').and.returnValue({
            primary: {
                id: 10
            }
        });
    }));

    it('should exist', function(){
        var controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: rootScope.$new()});
        expect(controller).toBeDefined();
    });

    describe('.checkLoading()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        it('should still be loading for input (t,t)', function() {
            scope.loadingMachines = true;
            scope.loadingTechnicians = true;
            scope.checkLoading();
            expect(scope.loading).toBe(true);
        });

        it('should still be loading for input (f,t)', function() {
            scope.loadingMachines = false;
            scope.loadingTechnicians = true;
            scope.checkLoading();
            expect(scope.loading).toBe(true);
        });

        it('should still be loading for input (t,f)', function() {
            scope.loadingMachines = true;
            scope.loadingTechnicians = false;
            scope.checkLoading();
            expect(scope.loading).toBe(true);
        });

        it('should no longer be loading for input (f, f)', function() {
            scope.loadingMachines = false;
            scope.loadingTechnicians = false;
            scope.checkLoading();
            expect(scope.loading).toBe(false);
        });
    });

    describe('.updateScheduledTests()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        it('should correctly count the number of machineGeneral tests from all toggled sub assemblies (3 / 6 sub assemblies should perform tests)', function() {
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 2,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 3,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 5,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 6,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(3);
        });

        it('should correctly count the number of machineGeneral tests from all sub assemblies', function() {
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 2,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 3,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 5,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                },
                                {
                                    id: 6,
                                    machineGeneral: true,
                                    oil: false,
                                    wear: false
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.toggleMajorAssembly(2);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(6);
        });

        it('should correctly count the number of oil tests from all toggled sub assemblies (3 / 6 sub assemblies should perform tests)', function() {
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 2,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 3,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 5,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 6,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(3);
        });

        it('should correctly count the number of oil tests from all sub assemblies', function() {
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 2,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 3,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 5,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                },
                                {
                                    id: 6,
                                    machineGeneral: false,
                                    oil: true,
                                    wear: false
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.toggleMajorAssembly(2);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(6);
        });

        it('should correctly count the number of wear tests from all toggled sub assemblies (3 / 6 sub assemblies should perform tests)', function() {
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 2,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 3,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 5,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 6,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(3);
        });

        it('should correctly count the number of wear tests from all toggled sub assemblies (3 / 6 sub assemblies should perform tests)', function() {
            var machine  = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 2,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 3,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 5,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 6,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(3);
        });

        it('should correctly count the number of wear tests from all sub assemblies', function() {
            var machine  = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 2,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 3,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 5,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                },
                                {
                                    id: 6,
                                    machineGeneral: false,
                                    oil: false,
                                    wear: true
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.toggleMajorAssembly(2);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(6);
        });

        it('should correctly count all test types from all sub assemblies', function() {
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1,
                                    machineGeneral: true,
                                    oil: true,
                                    wear: true
                                },
                                {
                                    id: 2,
                                    machineGeneral: true,
                                    oil: true,
                                    wear: true
                                },
                                {
                                    id: 3,
                                    machineGeneral: true,
                                    oil: true,
                                    wear: true
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4,
                                    machineGeneral: true,
                                    oil: true,
                                    wear: true
                                },
                                {
                                    id: 5,
                                    machineGeneral: true,
                                    oil: true,
                                    wear: true
                                },
                                {
                                    id: 6,
                                    machineGeneral: true,
                                    oil: true,
                                    wear: true
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            scope.toggleMajorAssembly(1);
            scope.toggleMajorAssembly(2);
            scope.updateScheduledTests();
            expect(scope.scheduledTests).toBe(18);
        });

    });

    describe('.setMachine()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        it('should correct set the machine', function() {
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1
                                },
                                {
                                    id: 2
                                },
                                {
                                    id: 3
                                }
                            ]
                        },
                        {
                            id: 2,
                            subAssemblies: [
                                {
                                    id: 4
                                },
                                {
                                    id: 5
                                },
                                {
                                    id: 6
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
            expect(scope.inspection.selectedMajorAssemblies[1][1]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[1][2]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[1][3]).toBe(false);

            expect(scope.inspection.selectedMajorAssemblies[2][4]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[2][5]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[2][6]).toBe(false);
        });
    });

    describe('.setTechnician()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
        });

        it('it should correctly set the technician', function() {
            var technician = {
                id: 578,
                name: 'test name',
                type: 'technician'
            };

            scope.setTechnician(technician);

            expect(scope.selectedTechnician).toBe(technician);
            expect(scope.inspection.technician).toBe(technician.id);
        });
    });

    describe('.toggleMajorAssembly()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1
                                },
                                {
                                    id: 2
                                },
                                {
                                    id: 3
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
        });

        it('it should correctly toggle major assemblies from false to true', function() {
            scope.toggleMajorAssembly(1);

            expect(scope.inspection.selectedMajorAssemblies[1][1]).toBe(true);
            expect(scope.inspection.selectedMajorAssemblies[1][2]).toBe(true);
            expect(scope.inspection.selectedMajorAssemblies[1][3]).toBe(true);
        });

        it('it should correctly toggle major assemblies from true to false', function() {
            scope.inspection.selectedMajorAssemblies[1][1] = true;
            scope.inspection.selectedMajorAssemblies[1][2] = true;
            scope.inspection.selectedMajorAssemblies[1][3] = true;
            scope.toggleMajorAssembly(1);

            expect(scope.inspection.selectedMajorAssemblies[1][1]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[1][2]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[1][3]).toBe(false);
        });
    });

    describe('.toggleSubAssembly()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});
            var machine = {
                id: 5,
                model: {
                    majorAssemblies: [
                        {
                            id: 1,
                            subAssemblies: [
                                {
                                    id: 1
                                },
                                {
                                    id: 2
                                },
                                {
                                    id: 3
                                }
                            ]
                        }
                    ]
                }
            };
            scope.setMachine(machine);
        });

        it('it should correctly toggle a sub assembly from true to false', function() {
            scope.toggleSubAssembly(1, 1);
            scope.toggleSubAssembly(1, 2);
            scope.toggleSubAssembly(1, 3);

            expect(scope.inspection.selectedMajorAssemblies[1][1]).toBe(true);
            expect(scope.inspection.selectedMajorAssemblies[1][2]).toBe(true);
            expect(scope.inspection.selectedMajorAssemblies[1][3]).toBe(true);
        });

        it('it should correctly toggle a sub assembly from false to true', function() {
            scope.inspection.selectedMajorAssemblies[1][1] = true;
            scope.inspection.selectedMajorAssemblies[1][2] = true;
            scope.inspection.selectedMajorAssemblies[1][3] = true;

            scope.toggleSubAssembly(1, 1);
            scope.toggleSubAssembly(1, 2);
            scope.toggleSubAssembly(1, 3);

            expect(scope.inspection.selectedMajorAssemblies[1][1]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[1][2]).toBe(false);
            expect(scope.inspection.selectedMajorAssemblies[1][3]).toBe(false);
        });
    });

    describe('.save()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerCreate('DomainExpertInspectionsControllerCreate', {$scope: scope});

            httpBackend.when('GET', ENV.apiEndpoint + 'machines?include=model.majorAssemblies.subAssemblies.tests').respond([
                {
                    id: 5,
                    name: 'machine 1',
                    model: {
                        majorAssemblies: [
                            {
                                id: 1,
                                subAssemblies: [
                                    {
                                        id: 1,
                                        machineGeneral: true,
                                        oil: true,
                                        wear: true
                                    }
                                ]
                            }
                        ]
                    }
                }]);
            httpBackend.when('GET', ENV.apiEndpoint + 'technicians').respond([
                {
                    id: 578,
                    name: 'technician',
                    type: 'technician',
                    expired: false
                }
            ]);
            httpBackend.flush();
        });

        it('should fail due to no tests being performed', function() {
            spyOn(toastr, 'warning');
            scope.scheduledTests = 0;
            scope.save();
            expect(toastr.warning).toHaveBeenCalledWith('You must schedule at least 1 test.');
        });


        it('should be successful', function() {
            scope.toggleMajorAssembly(1);
            httpBackend.when('POST', ENV.apiEndpoint + 'inspections/bulk').respond(200, '');
            spyOn($state, 'go');

            scope.save();
            httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('domainExpert-inspections-index');
        });

        it('should fail due to a server error', function() {
            scope.toggleMajorAssembly(1);
            httpBackend.when('POST', ENV.apiEndpoint + 'inspections/bulk').respond(422, '');
            spyOn(toastr, 'error');

            scope.save();
            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error while scheduling the inspection.', 'Error');
        });
    });
});