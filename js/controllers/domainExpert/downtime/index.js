angular
    .module('joy-global')
    .controller('DomainExpertDowntimeControllerIndex', ['$scope', 'LayoutService', 'Downtime', '$state', 'Machines', 'toastr', function ($scope, LayoutService, Downtime, $state, Machines, toastr) {
        $scope.displayGraphs = false;
        $scope.loading = true;

        $scope.systemGraph = {};
        $scope.reasonGraph = {};
        $scope.systemData = [];
        $scope.reasonData = [];
        $scope.systemCategories = [];
        $scope.reasonCategories = [];

        $scope.machine = {id: -1};

        LayoutService.reset();
        LayoutService.setTitle(['Home']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Import </button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-downtime-index',
                displayName: 'Downtime'
            }
        ]);
        Machines.getList().then(function (data) {
            $scope.machines = [];

            angular.forEach(data, function (machine) {
                $scope.machines.push({name: machine.name, id: machine.id});
            });

            $scope.loading = false;
        });

        $scope.generateGraphs = function() {
            if($scope.machine.id == null || $scope.machine.id == -1) {
                toastr.clear();
                toastr.error("Please choose a machine to show a graph for");
                return;
            }

            Downtime.getByMachine().one($scope.machine.id).get({include: 'machine'}).then(function (data){
                if(data.length > 0) {
                    $scope.systemGraph = {
                        options: {
                            chart: {
                                type: 'bar'
                            },
                            tooltip: {
                                valueSuffix: ' hours'
                            },
                        },
                        title: {
                            text: 'System Downtime: ' + data[0].machine.name
                        },
                        xAxis: {
                            categories: [],
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Downtime (Hrs)',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify',
                                align: 'centre'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' hours'
                        },
                        credits: {
                            enabled: false
                        },
                        series: []
                    };

                    $scope.reasonGraph = {
                        options: {
                            chart: {
                                type: 'bar'
                            },
                            tooltip: {
                                valueSuffix: ' hours'
                            },
                        },
                        title: {
                            text: 'Detailed Downtime: ' + data[0].machine.name
                        },
                        xAxis: {
                            categories: [],
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Downtime (Hrs)',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify',
                                align: 'centre'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' hours'
                        },
                        credits: {
                            enabled: false
                        },
                        series: []
                    };

                    $scope.downTime = data;

                    $scope.systemCategories = [];
                    $scope.reasonCategories = [];
                    $scope.systemData = [];
                    $scope.reasonData = [];

                    angular.forEach(data, function (entry) {
                        $scope.createSeries(entry);
                    });

                    $scope.createGraphs();
                    $scope.displayGraphs = true;
                }else {
                    toastr.clear();
                    toastr.error("Their is no downtime data for this machine!");
                }
            });
        };

        $scope.createGraphs = function() {
            //system graph
            $scope.systemGraph.xAxis.categories = $scope.systemCategories;

            var systemSeries = {data: []};
            angular.forEach($scope.systemData, function(entry) {
                systemSeries.data.push(entry.hours);
            });

            $scope.systemGraph.series.push(systemSeries);
            $scope.displaySystemGraph = true;

            //reason graph
            if($scope.reasonCategories.length > 1) {
                $scope.reasonGraph.xAxis.categories = $scope.reasonCategories;

                var reasonSeries = {data: []};
                angular.forEach($scope.reasonData, function (entry) {
                    reasonSeries.data.push(entry.hours);
                });

                $scope.reasonGraph.series.push(reasonSeries);
                $scope.displayReasonGraph = true;
            }
        };

        $scope.createSeries = function(entry) {
            var systemCategoriesLocation = $scope.systemCategories.indexOf(entry.systemName);

            if(systemCategoriesLocation == -1) {
                $scope.systemCategories.push(entry.systemName);

                $scope.systemData.push({hours: parseInt(entry.downTimeHours)});
            }else {
                $scope.systemData[systemCategoriesLocation].hours += parseInt(entry.downTimeHours);
            }

            if(entry.reason != null || entry.reason != '') {
                var reasonCategoriesLocation = $scope.reasonCategories.indexOf(entry.reason);

                if(reasonCategoriesLocation == -1) {
                    $scope.reasonCategories.push(entry.reason);

                    $scope.reasonData.push({hours: parseInt(entry.downTimeHours)});
                }else {
                    $scope.reasonData[reasonCategoriesLocation].hours += parseInt(entry.downTimeHours);
                }
            }
        };

        LayoutService.getPageHeader().onClicked(function () {
            $state.go('domainExpert-downtime-import')
        });
    }]);