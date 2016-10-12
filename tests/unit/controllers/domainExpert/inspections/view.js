describe('DomainExpertInspectionsControllerView', function () {
    var DomainExpertInspectionsControllerView, rootScope, httpBackend, AuthService, $state, toastr, ENV, Restangular;
    var inspectionGetRequest = 'inspections?include=technician,scheduler,machine.model,majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly';
    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _AuthService_, _$state_, _toastr_, _ENV_, _Restangular_) {
        DomainExpertInspectionsControllerView = $controller;
        rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        AuthService = _AuthService_;
        $state = _$state_;
        toastr = _toastr_;
        ENV = _ENV_;
        Restangular = _Restangular_;

        //allow us to fake a user being logged in
        spyOn(AuthService, 'getUser').and.returnValue({
            primary: {
                id: 10
            }
        });
    }));

    it('should exist', function(){
        var controller = DomainExpertInspectionsControllerView('DomainExpertInspectionsControllerView', {$scope: {}});
        expect(controller).toBeDefined();
    });

    describe('.addComment()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerView('DomainExpertInspectionsControllerView', {$scope: scope});
        });

        it('should fail due to comment being empty', function() {
            spyOn(toastr, 'warning');

            scope.comment = '';
            scope.addComment();

            expect(toastr.warning).toHaveBeenCalledWith('You must enter a comment.');
        });

        it('should fail due to a server error', function() {
            //we don't need to set up the tree to check if the comment will fail due to a server error, so respond with 422 instead of an actual response.
            httpBackend.when('GET', ENV.apiEndpoint + inspectionGetRequest).respond(422, '');
            httpBackend.when('POST', ENV.apiEndpoint + 'comments').respond(422, '');
            spyOn(toastr, 'error');

            scope.comment = 'testing';
            scope.node = {
                id: 1
            };

            scope.addComment();
            httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('There was an error while saving your comment.', 'Error');
        });
    });

    describe('.selectNode()', function() {
        var scope, controller, inspectionData;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerView('DomainExpertInspectionsControllerView', {$scope: scope});
            inspectionData = {
                id: 0,
                comments: [],
                photos: [],
                majorAssemblies: [
                    {
                        id: 1,
                        photos: [],
                        majorAssembly: {
                            name: 'major 1'
                        },
                        comments: [
                            {
                                text: 'message',
                                id: '1'
                            }
                        ],
                        subAssemblies: [
                            {
                                id: 1,
                                photos: [],
                                subAssembly: {
                                    name: 'sub 1'
                                },
                                comments: [
                                    {
                                        text: 'message',
                                        id: '2'
                                    }
                                ],
                                machineGeneralTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                                oilTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                                wearTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                            }
                        ]
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + inspectionGetRequest).respond(inspectionData);
            httpBackend.flush();
        });

        it('should correctly select the root node', function() {
            scope.selectNode({}, {node:{id:'root'}});

            expect(scope.title).toBe('Inspection 0');
            expect(scope.type).toBe('inspection');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData);
            expect(scope.comments).toEqual(inspectionData.comments);
            expect(scope.photos).toEqual(inspectionData.photos);
        });

        it('should correctly select the roots first child', function() {
            scope.selectNode({}, {node:{id:'root-1'}});

            expect(scope.title).toBe('major 1');
            expect(scope.type).toBe('majorAssembly');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0]);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].photos);
        });

        it('should correctly select the roots first childs child', function() {
            scope.selectNode({}, {node:{id:'root-1-1'}});

            expect(scope.title).toBe('sub 1');
            expect(scope.type).toBe('subAssembly');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0]);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].photos);
        });

        it('should correctly select the roots first childs child machineGeneral test', function() {
            scope.selectNode({}, {node:{id:'root-1-1-machineGeneral'}});

            expect(scope.title).toBe('Machine General Test');
            expect(scope.type).toBe('test-machineGeneral');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].machineGeneralTest);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].machineGeneralTest.comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].machineGeneralTest.photos);
        });

        it('should correctly select the roots first childs child oil test', function() {
            scope.selectNode({}, {node:{id:'root-1-1-oil'}});

            expect(scope.title).toBe('Oil Test');
            expect(scope.type).toBe('test-oil');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].oilTest);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].oilTest.comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].oilTest.photos);
        });

        it('should correctly select the roots first childs child wear test', function() {
            scope.selectNode({}, {node:{id:'root-1-1-wear'}});

            expect(scope.title).toBe('Wear Test');
            expect(scope.type).toBe('test-wear');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].wearTest);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].wearTest.comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].wearTest.photos);
        });
    });

    describe('.parseNode()', function() {
        var scope, controller, inspectionData;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerView('DomainExpertInspectionsControllerView', {$scope: scope});
            inspectionData = {
                id: 0,
                comments: [],
                photos: [],
                majorAssemblies: [
                    {
                        id: 1,
                        photos: [],
                        majorAssembly: {
                            name: 'major 1'
                        },
                        comments: [
                            {
                                text: 'message',
                                id: '1'
                            }
                        ],
                        subAssemblies: [
                            {
                                id: 1,
                                photos: [],
                                subAssembly: {
                                    name: 'sub 1'
                                },
                                comments: [
                                    {
                                        text: 'message',
                                        id: '2'
                                    }
                                ],
                                machineGeneralTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                                oilTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                                wearTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                            }
                        ]
                    }
                ]
            };

            httpBackend.when('GET', ENV.apiEndpoint + inspectionGetRequest).respond(inspectionData);
            httpBackend.flush();
        });

        it('should correctly parse the root node', function() {
            scope.parseNode('root');

            expect(scope.title).toBe('Inspection 0');
            expect(scope.type).toBe('inspection');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData);
            expect(scope.comments).toEqual(inspectionData.comments);
            expect(scope.photos).toEqual(inspectionData.photos);
        });
        
        it('should correctly parse the roots first child', function() {
            scope.parseNode('root-1');

            expect(scope.title).toBe('major 1');
            expect(scope.type).toBe('majorAssembly');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0]);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].photos);
        });

        it('should correctly parse the roots first childs child', function() {
            scope.parseNode('root-1-1');

            expect(scope.title).toBe('sub 1');
            expect(scope.type).toBe('subAssembly');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0]);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].photos);
        });

        it('should correctly parse the roots first childs child machineGeneral test', function() {
            scope.parseNode('root-1-1-machineGeneral');

            expect(scope.title).toBe('Machine General Test');
            expect(scope.type).toBe('test-machineGeneral');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].machineGeneralTest);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].machineGeneralTest.comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].machineGeneralTest.photos);
        });

        it('should correctly parse the roots first childs child oil test', function() {
            scope.parseNode('root-1-1-oil');

            expect(scope.title).toBe('Oil Test');
            expect(scope.type).toBe('test-oil');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].oilTest);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].oilTest.comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].oilTest.photos);
        });

        it('should correctly parse the roots first childs child wear test', function() {
            scope.parseNode('root-1-1-wear');

            expect(scope.title).toBe('Wear Test');
            expect(scope.type).toBe('test-wear');
            expect(Restangular.stripRestangular(scope.node)).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].wearTest);
            expect(scope.comments).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].wearTest.comments);
            expect(scope.photos).toEqual(inspectionData.majorAssemblies[0].subAssemblies[0].wearTest.photos);
        });

    });
    
    describe('.buildTree()', function() {
        var scope, controller;

        beforeEach(function () {
            scope = rootScope.$new();
            controller = DomainExpertInspectionsControllerView('DomainExpertInspectionsControllerView', {$scope: scope});
        });

        it('should create the tree correctly', function() {
            var inspection = {
                id: 0,
                comments: [],
                photos: [],
                majorAssemblies: [
                    {
                        id: 1,
                        photos: [],
                        majorAssembly: {
                            name: 'major 1'
                        },
                        comments: [
                            {
                                text: 'message',
                                id: '1'
                            }
                        ],
                        subAssemblies: [
                            {
                                id: 1,
                                photos: [],
                                subAssembly: {
                                    name: 'sub 1'
                                },
                                comments: [
                                    {
                                        text: 'message',
                                        id: '2'
                                    }
                                ],
                                machineGeneralTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                                oilTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                                wearTest: {
                                    comments: [
                                        {
                                            text: 'message',
                                            id: '3'
                                        }
                                    ]
                                },
                            }
                        ]
                    }
                ]
            };
            
            var resultTree = {
                id:"root",
                text:"Inspection undefined",
                children:[
                    {
                        id:"root-1",
                        text:"major 1",
                        children:[
                            {
                                id:"root-1-1",
                                text:"sub 1",
                                children:[
                                    {
                                        id:"root-1-1-machineGeneral",
                                        text:"Machine General Test",
                                        type:"machine-general-test",
                                        state:{
                                            opened:true,
                                            selected:false
                                        },
                                        a_attr:{
                                            class:"text-highlight"
                                        }
                                    },
                                    {
                                        id:"root-1-1-oil",
                                        text:"Oil Test",
                                        type:"oil-test",
                                        state:{
                                            opened:true,
                                            selected:false
                                        },
                                        a_attr:{
                                            class:"text-highlight"
                                        }
                                    },
                                    {
                                        id:"root-1-1-wear",
                                        text:"Wear Test",
                                        type:"wear-test",
                                        state:{
                                            "opened":true,
                                            "selected":false
                                        },
                                        a_attr:{
                                            class:"text-highlight"
                                        }
                                    }
                                ],
                                state:{
                                    "opened":true,
                                    "selected":false
                                },
                                a_attr:{
                                    class:"text-highlight"
                                }
                            }
                        ],
                        state:{
                            opened:true,
                            selected:false
                        },
                        a_attr:{
                            class:"text-highlight"
                        }
                    }
                ],
                state:{
                    opened:true,
                    selected:true
                }
            };

            httpBackend.when('GET', ENV.apiEndpoint + inspectionGetRequest).respond(inspection);
            httpBackend.flush();
            
            expect(scope.treeData[0]).toEqual(resultTree);
        });
    });
});