//Controller to allow the viewing of information related to a machine.
angular
    .module('joy-global')
    .controller('DomainExpertMachinesControllerView', ['$scope', '$state', 'Machines', '$stateParams', 'LayoutService', 'moment', 'DataTablesService', 'Downtime', 'toastr', function ($scope, $state, Machines, $stateParams, LayoutService, moment, DataTablesService, Downtime, toastr) {
        $scope.machineId = $stateParams.id;
	    $scope.loading = true;

	    $scope.moment = moment;
	    $scope.dtOptions = DataTablesService.prepare('Inspection History');

        //graph downtime data
        $scope.displayGraphs = false;
        $scope.systemGraph = {};
        $scope.reasonGraph = {};
        $scope.systemData = [];
        $scope.reasonData = [];
        $scope.systemCategories = [];
        $scope.reasonCategories = [];
        $scope.noGraphsAvailable = false;

        //import downtime data
        $scope.loadingFile = true;
        $scope.cellNames = {
            systemNameCell: '',
            downTimeHoursCell: '',
            reasonCell: ''

        }
        $scope.unprocessedData = {};
        $scope.downtime = {
            machine: $scope.machineId,
            data: []
        };

        //get the data of the machine from the server
        Machines.one($scope.machineId).get({include: 'model.majorAssemblies.subAssemblies,inspections.technician,inspections.scheduler'}).then(
	        function(data) {
		        $scope.loading = false;

		        $scope.machine = data;

                $scope.generateGraphs();
	        }
        );

        LayoutService.reset();
        LayoutService.setTitle(['Machine ' + $scope.machineId, 'Machines']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-calendar-plus-o"></i> Schedule Inspection</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-machines-index',
                displayName: 'Machines'
            },
            {
                route: 'domainExpert-machines-view({ id: ' + $scope.machineId + ' })',
                displayName: 'Machine ' + $scope.machineId
            }
        ]);

        //GRAPH DOWN TIME DATA
        $scope.generateGraphs = function() {
            Downtime.getByMachine().one($scope.machineId).get({include: 'machine'}).then(function (data){
                if(data.length > 0) {
                    //system graph config
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

                    //reason graph config
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

                    //add the data to the series
                    angular.forEach(data, function (entry) {
                        $scope.createSeries(entry);
                    });

                    //create the graphs
                    $scope.createGraphs();

                    //allow the graphs to be rendered to the page
                    $scope.displayGraphs = true;
                    $scope.noGraphsAvailable = false;
                }else {
                    $scope.noGraphsAvailable = true;
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

                $scope.systemData.push({hours: parseFloat(entry.downTimeHours)});
            }else {
                $scope.systemData[systemCategoriesLocation].hours += parseFloat(entry.downTimeHours);
            }

            if(entry.reason != null || entry.reason != '') {
                var reasonCategoriesLocation = $scope.reasonCategories.indexOf(entry.reason);

                if(reasonCategoriesLocation == -1) {
                    $scope.reasonCategories.push(entry.reason);

                    $scope.reasonData.push({hours: parseFloat(entry.downTimeHours)});
                }else {
                    $scope.reasonData[reasonCategoriesLocation].hours += parseFloat(entry.downTimeHours);
                }
            }
        };

        //IMPORTING DOWNTIME DATA
        var fileInput = document.getElementById('downtimeImportFile');

        //handle the reading of the excell file that was imported
        $scope.handleFile = function (e) {
            $scope.loadingFile = true;
            var files = e.target.files;
            var i, f;
            for (i = 0, f = files[i]; i != files.length; ++i) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;

                    var workbook = XLSX.read(data, {type: 'binary'});
                    $scope.workbook = workbook;
                    workbook.SheetNames.forEach(function (sheetName) {
                        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        if (roa.length > 0) {
                            $scope.unprocessedData[sheetName] = roa;
                        }
                    });

                    $scope.findHeaders(workbook.Sheets[workbook.SheetNames[0]]);

                    $scope.$apply(function () {
                        $scope.loadingFile = false;
                    });
                };
                reader.readAsBinaryString(f);
            }
        };
        fileInput.addEventListener('change', $scope.handleFile, false); //add function to when the user adds a file

        //importing a excell file into the system
        $scope.import = function () {
            $scope.downtime.data = [];
            if ($scope.loadingFile == false) {
                if ($scope.validate()) {
                    var sheet = $scope.workbook.Sheets[$scope.workbook.SheetNames[0]];
                    for(var ii = 1; ; ii++) {

                        var data = {};
                        var cellData = JSON.parse($scope.cellNames.systemNameCell);

                        var cell = XLSX.utils.encode_cell({c: cellData.c, r: (cellData.r + ii)});
                        if(sheet[cell] == null || sheet[cell] == ""){
                            break;
                        }

                        data["systemName"] = sheet[cell].v;

                        cellData = JSON.parse($scope.cellNames.downTimeHoursCell);
                        cell = XLSX.utils.encode_cell({c: cellData.c, r: cellData.r + ii});
                        if(sheet[cell] == null || sheet[cell] == ""){
                            break;
                        }

                        if(String(sheet[cell].w).indexOf(":") != -1) {
                            var timeArray = String(sheet[cell].w).trim().replace(/\D/g, ' ').split(' ');
                            var seconds = 0;
                            //day, hours, min, secs
                            for (var i = timeArray.length - 1; i >= 0; i--) {
                                seconds += parseInt(timeArray[i]) * Math.pow(60, (timeArray.length - i) - 1)
                            }
                            var hours = seconds / 3600;

                            data["downTimeHours"] = hours;
                        } else {
                            data["downTimeHours"] = sheet[cell].w
                        }

                        if ($scope.cellNames.reasonCell != null && $scope.cellNames.reasonCell != "") {
                            cellData = JSON.parse($scope.cellNames.reasonCell);
                            cell = XLSX.utils.encode_cell({c: cellData.c, r: cellData.r + ii});
                            if(sheet[cell] != null){
                                data["reason"] = sheet[cell].v;
                            }
                        }
                        $scope.downtime.data.push(data);
                    }

                    if($scope.downtime.data.length == 0) {
                        toastr.clear();
                        toastr.error("Their was an issue importing the file");
                        return;
                    }

                    Downtime.getBulk().post($scope.downtime)
                        .then(function () {
                            toastr.clear();
                            toastr.success('Data was imported successfully.');

                            $scope.generateGraphs();

                            $scope.dismiss();

                        }, function () {
                            toastr.clear();
                            toastr.error('There was an error importing the data.');
                        });
                } else {
                    toastr.clear();
                    toastr.error("Please enter all fields correctly.");
                }
            } else {
                toastr.clear();
                toastr.error("Please load a file");
            }
        };

        //validate the downtime data array
        $scope.validate = function () {
            if ($scope.downtime.machine == null || isNaN($scope.downtime.machine)) {
                return false;
            }

            if ($scope.cellNames.systemNameCell == null || $scope.cellNames.systemNameCell == "") {
                return false;
            }

            if ($scope.cellNames.downTimeHoursCell == null || $scope.cellNames.downTimeHoursCell == "") {
                return false;
            }

            return true;
        };

        //find heads in a excell file
        //searches the first 20 rows and columns for headers
        //minimum of 3 consecutive cells must be occupied to count as headers found
        $scope.findHeaders = function (worksheet) {
            $scope.headers = [];
            $scope.headersCell = [];

            var rowValueCount = 0;

            var row = 0; //row the heads are at
            var colStart = 0; //column the headers start at
            var colEnd = 0; //column the headers end at
            var found = false; //whether we found headers or not

            //search through 20 rows
            for (var r = 0; r <= 20; r++) {
                var first = true;
                rowValueCount = 0;

                //search through 20 columns
                for (var c = 0; c <= 20; c++) {
                    var cellNumber = XLSX.utils.encode_cell({c: c, r: r});
                    var cell = worksheet[cellNumber];
                    var value = null;

                    if (cell != null) {
                        value = cell.v;
                    }
                    if (value != null && value != "") {
                        if (first == true) {
                            row = r;
                            colStart = c;
                            first = false;
                        }
                        rowValueCount += 1;
                    } else if (rowValueCount >= 3) {
                        colEnd = c - 1;
                        found = true;
                        break;
                    }
                }

                if (found == true) {
                    break;
                }
            }

            //if the headers are found, add the headers to the page
            if (found == true) {
                for (var c = colStart; c <= colEnd; c++) {
                    var cell = XLSX.utils.encode_cell({c: c, r: row});
                    var data = {
                        name: worksheet[cell].v,
                        id: {c: c, r: row}
                    };
                    $scope.headers.push(data);
                }
            } else {
                toastr.clear();
                toastr.error("The provided file is not suitable, please delete all irrelevant info from the file and try again.");
            }
        };

	    LayoutService.getPageHeader().onClicked(function () {
		    $state.go('domainExpert-inspections-create');
	    });

    }]);