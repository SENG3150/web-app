angular
    .module('joy-global')
    .controller('DomainExpertDowntimeControllerImport', ['$scope', 'LayoutService', 'Downtime', 'toastr', 'Machines', '$state', function ($scope, LayoutService, Downtime, toastr, Machines, $state) {
        $scope.fileText = null;
        $scope.loadingFile = true;
        $scope.systemNameCell = "";
        $scope.downTimeHoursCell = "";
        $scope.reasonCell = "";

        $scope.unprocessedData = {};
        $scope.downtime = {
            machine: null,
            data: []
        };

        $scope.loading = true;
        Machines.getList().then(function (data) {
            $scope.machines = [];

            angular.forEach(data, function (machine) {
                $scope.machines.push({name: machine.name, id: machine.id});
            });

            $scope.loading = false;
        });

        LayoutService.reset();
        LayoutService.setTitle(['Home']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-downtime-index',
                displayName: 'Downtime'
            },
            {
                route: 'domainExpert-downtime-import',
                displayName: 'Import'
            }
        ]);
        var fileInput = document.getElementById('downtimeImportFile');

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
        fileInput.addEventListener('change', $scope.handleFile, false);

        $scope.import = function () {
            $scope.downtime.data = [];
            if ($scope.loadingFile == false) {
                if ($scope.validate()) {
                    var sheet = $scope.workbook.Sheets[$scope.workbook.SheetNames[0]];
                    for(var ii = 1; ; ii++) {

                        var data = {};
                        var cellData = JSON.parse($scope.systemNameCell);

                        var cell = XLSX.utils.encode_cell({c: cellData.c, r: (cellData.r + ii)});
                        if(sheet[cell] == null || sheet[cell] == ""){
                            break;
                        }

                        data["systemName"] = sheet[cell].v;

                        cellData = JSON.parse($scope.downTimeHoursCell);
                        cell = XLSX.utils.encode_cell({c: cellData.c, r: cellData.r + ii});
                        if(sheet[cell] == null || sheet[cell] == ""){
                            break;
                        }

                        if(String(sheet[cell].w).indexOf(":") != -1) {
                            var timeArray = String(sheet[cell].w).trim().replace(/\D/g, ' ').split(' ');
                            var seconds = 0;
                            //day, hours, min, secs
                            for (var i = timeArray.length - 1; i >= 0; i--) {
                                seconds += parseInt(timeArray[i]) * Math.pow(60, (timeArray.length - i))
                            }
                            var hours = seconds / 3600;

                            data["downTimeHours"] = hours;
                        } else {
                            data["downTimeHours"] = sheet[cell].w
                        }

                        if ($scope.reasonCell != null && $scope.reasonCell != "") {
                            cellData = JSON.parse($scope.reasonCell);
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
                            $state.go('domainExpert-downtime-index');
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

        $scope.validate = function () {
            if ($scope.downtime.machine == null || isNaN($scope.downtime.machine)) {
                return false;
            }

            if ($scope.systemNameCell == null || $scope.systemNameCell == "") {
                return false;
            }

            if ($scope.downTimeHoursCell == null || $scope.downTimeHoursCell == "") {
                return false;
            }

            return true;
        };

        $scope.findHeaders = function (worksheet) {
            $scope.headers = [];
            $scope.headersCell = [];

            var rowValueCount = 0;

            var row = 0;
            var colStart = 0;
            var colEnd = 0;
            var found = false;
            for (var r = 0; r <= 20; r++) {
                var first = true;
                rowValueCount = 0;
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

        LayoutService.getPageHeader().onClicked($scope.import);
    }]);