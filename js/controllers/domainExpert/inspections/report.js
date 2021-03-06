//Controller to allow the display and downloading of a report of an inspection.
angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerReport', ['$scope', 'Inspections', 'moment', '$stateParams', 'LayoutService', 'DomainExpertInspectionReportService', 'toastr', function ($scope, Inspections, moment, $stateParams, LayoutService, DomainExpertInspectionReportService, toastr) {
		$scope.inspectionId = $stateParams.id;
		$scope.loading = true;
		$scope.loadingGraphs = true;
		$scope.loadingInspection = true;

		var baseInspections = Inspections.one($scope.inspectionId);

		$scope.moment = moment;

		LayoutService.reset();
		LayoutService.setTitle([
			'Inspection ' + $scope.inspectionId + ' - Report',
			'Inspection ' + $scope.inspectionId,
			'Inspections'
		]);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-download"></i> Download Report</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-inspections-index',
				displayName: 'Inspections'
			},
			{
				route: 'domainExpert-inspections-view({ id: ' + $scope.inspectionId + ' })',
				displayName: 'Inspection ' + $scope.inspectionId
			},
			{
				route: 'domainExpert-inspections-report({ id: ' + $scope.inspectionId + ' })',
				displayName: ' Report'
			}
		]);

		// callback for when the json has been returned from the API
		baseInspections.get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
		}).then(
			function (data) {
				$scope.inspection = data;

				// callback for once we have received the graphs json back
				baseInspections.one('graphs').get().then(
					function (data) {
						$scope.loading = false;

						//loop through each sub assembly
						angular.forEach(data.subAssemblies, function (subAssembly) {
							subAssembly.oilTestGraphs = [];
							subAssembly.wearTestGraphs = [];

							// check to see if the sub assembly requires oil test graphs
							if (subAssembly.oilTests && subAssembly.oilTests.length > 0) {
								var lead = [];
								var copper = [];
								var tin = [];
								var iron = [];
								var pq90 = [];
								var silicon = [];
								var sodium = [];
								var aluminium = [];
								var water = [];
								var viscosity = [];

								// loop through all the oil tests we have for a specified assembly
								angular.forEach(subAssembly.oilTests, function (oilTest) {
									var date = moment(oilTest.timeCompleted).valueOf();

									lead.push([date, parseFloat(oilTest.lead)]);
									copper.push([date, parseFloat(oilTest.copper)]);
									tin.push([date, parseFloat(oilTest.tin)]);
									iron.push([date, parseFloat(oilTest.iron)]);
									pq90.push([date, parseFloat(oilTest.pq90)]);
									silicon.push([date, parseFloat(oilTest.silicon)]);
									sodium.push([date, parseFloat(oilTest.sodium)]);
									aluminium.push([date, parseFloat(oilTest.aluminium)]);
									water.push([date, parseFloat(oilTest.water)]);
									viscosity.push([date, parseFloat(oilTest.viscosity)]);
								});

								// specify each trace that is required for each graph
								var graphOne = [
									{
										name: "Sodium (Na)",
										data: sodium
									},
									{
										name: "Silicon (Si)",
										data: silicon
									},
									{
										name: "Aluminium (Al)",
										data: aluminium
									},
									{
										name: "Lead (Pb)",
										data: lead
									},
									{
										name: "Copper (Cu)",
										data: copper
									},
									{
										name: "Tin (Sn)",
										data: tin
									}
								];

								var graphTwo = [
									{
										name: "Iron (Fe)",
										data: iron
									},
									{
										name: "PQ90",
										data: pq90
									}
								];

								var graphThree = [
									{
										name: "Water",
										data: water
									}
								];

								var graphFour = [
									{
										name: "Viscosity (460)",
										data: viscosity
									}
								];

								//create a time line graph for each graph we require
								subAssembly.oilTestGraphs = [
									createTimeLineGraph(subAssembly.name + ' - Oil Test', graphOne),
									createTimeLineGraph(subAssembly.name + ' - Oil Test', graphTwo),
									createTimeLineGraph(subAssembly.name + ' - Oil Test', graphThree),
									createTimeLineGraph(subAssembly.name + ' - Oil Test', graphFour)
								];
							}

							// check to see if the sub assembly requires wear test graphs
							if (subAssembly.wearTests && subAssembly.wearTests.length > 0) {
								var line = [];

								// loop through each wear test we have for the specific assembly
								angular.forEach(subAssembly.wearTests, function (wearTest, index) {
									line.push([moment(wearTest.timeCompleted).valueOf(), wearTest.smu]);
								});

								//if we have all the correct data, add the graph to the page.
								if (line.length != 0) {
									subAssembly.wearTestGraphs = [
										createWearGraph(subAssembly.name + ' - Wear Test', line)
									];
								}
							}

							if (subAssembly.oilTestGraphs.length > 0 || subAssembly.wearTestGraphs.length > 0) {
								angular.forEach($scope.inspection.majorAssemblies, function (inspectionMajorAssembly) {
									angular.forEach(inspectionMajorAssembly.subAssemblies, function (inspectionSubAssembly) {
										if (inspectionSubAssembly.id == subAssembly.id) {
											inspectionSubAssembly.oilTestGraphs = subAssembly.oilTestGraphs;
											inspectionSubAssembly.wearTestGraphs = subAssembly.wearTestGraphs;
										}
									});
								});
							}
						});
					}
				);
			}
		);

		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			},
			colors: {
				0: '#c31f30',
				1: '#7F8084',
				2: '#086390'
			}
		});

		//create a time line graph
		var createTimeLineGraph = function (graphTitle, traces) {
			return {
				chart: {
					type: 'spline'
				},
				title: {
					text: graphTitle
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
				series: traces
			};
		};

		//create a wear graph
		var createWearGraph = function (graphName, line) {
			return {
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
					text: graphName
				},
				legend: {
					enabled: false
				},
				series: [{
					type: 'line',
					data: line,
					marker: {
						radius: 4
					}
				}]
			};
		};

		//allow for the downloading of the report. The required information is packed to be sent to the server
		//to produce the report, which will return with the generated pdf.
		$scope.download = function () {
			toastr.clear();
			toastr.info('Your report is being prepared, please be patient as this can take up to a minute depending on your connection.');

			var request = {
				majorAssemblies: []
			};

			// https://gist.github.com/philfreo/0a4d899de4257e08a000
			angular.forEach($scope.inspection.majorAssemblies, function (majorAssembly) {
				var requestMajorAssembly = {
					name: majorAssembly.majorAssembly.name,
					subAssemblies: []
				};

				angular.forEach(majorAssembly.subAssemblies, function (subAssembly) {
					var requestSubAssembly = {
						name: subAssembly.subAssembly.name,
						actionItems: [],
						graphs: []
					};

					var actionItem = {};

					if (subAssembly.machineGeneralTest != null && subAssembly.machineGeneralTest.actionItem != null) {
						actionItem = subAssembly.machineGeneralTest.actionItem;

						requestSubAssembly.actionItems.push({
							test: 'Machine General',
							status: actionItem.status,
							issue: actionItem.status,
							action: actionItem.status,
							technician: actionItem.technician.name,
							timeActioned: moment(actionItem.timeActioned).format('HH:mm ddd, MMM Do YYYY')
						});
					}

					if (subAssembly.oilTest != null && subAssembly.oilTest.actionItem != null) {
						actionItem = subAssembly.oilTest.actionItem;

						requestSubAssembly.actionItems.push({
							test: 'Oil',
							status: actionItem.status,
							issue: actionItem.status,
							action: actionItem.status,
							technician: actionItem.technician.name,
							timeActioned: moment(actionItem.timeActioned).format('HH:mm ddd, MMM Do YYYY')
						});
					}

					if (subAssembly.wearTest != null && subAssembly.wearTest.actionItem != null) {
						actionItem = subAssembly.wearTest.actionItem;

						requestSubAssembly.actionItems.push({
							test: 'Wear',
							status: actionItem.status,
							issue: actionItem.status,
							action: actionItem.status,
							technician: actionItem.technician.name,
							timeActioned: moment(actionItem.timeActioned).format('HH:mm ddd, MMM Do YYYY')
						});
					}

					angular.forEach(subAssembly.oilTestGraphs, function (oilTestGraph) {
						var svgData = new XMLSerializer().serializeToString(angular.element(oilTestGraph.getHighcharts().container).find('svg')[0]);

						requestSubAssembly.graphs.push('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));
					});

					angular.forEach(subAssembly.wearTestGraphs, function (wearTestGraph) {
						var svgData = new XMLSerializer().serializeToString(angular.element(wearTestGraph.getHighcharts().container).find('svg')[0]);

						requestSubAssembly.graphs.push('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));
					});

					requestMajorAssembly.subAssemblies.push(requestSubAssembly);
				});

				request.majorAssemblies.push(requestMajorAssembly);
			});

			DomainExpertInspectionReportService.download($scope.inspectionId, request);
		};

		LayoutService.getPageHeader().onClicked($scope.download);
	}]);