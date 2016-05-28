angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerReport', ['$scope', 'Inspections', 'moment', '$stateParams', 'LayoutService', function ($scope, Inspections, moment, $stateParams, LayoutService) {
		$scope.inspectionId = $stateParams.id;
		$scope.loading = true;
		$scope.loadingGraphs = true;
		$scope.loadingInspection = true;

		var baseInspections = Inspections.one($scope.inspectionId);

		$scope.moment = moment;
		$scope.subAssemblies = [];

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

		baseInspections.get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
		}).then(
			function (data) {
				$scope.loadingInspection = false;

				$scope.inspection = data;

				$scope.checkLoading();
			}
		);

		$scope.checkLoading = function () {
			if ($scope.loadingGraphs == false && $scope.loadingInspection == false) {
				$scope.loading = false;
			}
		};

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

		baseInspections.one('graphs').get().then(
			function (data) {
				$scope.loadingGraphs = false;

				angular.forEach(data.subAssemblies, function (subAssembly) {
					subAssembly.oilTestGraphs = [];
					subAssembly.wearTestGraphs = [];

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

						subAssembly.oilTestGraphs = [
							createTimeLineGraph(subAssembly.name + ' - Oil Test', graphOne),
							createTimeLineGraph(subAssembly.name + ' - Oil Test', graphTwo),
							createTimeLineGraph(subAssembly.name + ' - Oil Test', graphThree),
							createTimeLineGraph(subAssembly.name + ' - Oil Test', graphFour)
						];
					}

					if (subAssembly.wearTests && subAssembly.wearTests.length > 0) {
						var scatterPlot = [];
						var regressionLine = [];
						var firstGreyLine = [];
						var secondGreyLine = [];

						angular.forEach(subAssembly.wearTests, function (wearTest, index) {
							if (wearTest.uniqueDetails['value'] != null && wearTest.uniqueDetails['new'] != null
								&& wearTest.uniqueDetails['lifeUpper'] != null && wearTest.uniqueDetails['limit'] != null) {
								// scatter plot: x = SMU, y = (value on wear / replace)
								// line of best fit between scatter plots
								scatterPlot.push([wearTest.smu, wearTest.uniqueDetails['value']]);
								regressionLine.push([wearTest.smu, wearTest.uniqueDetails['value']]);

								// grey line:
								//      Line 1:
								// 			start: x = smu LOWER    , y = (wear / replace) NEW
								//			end:   x = (wear / replace) UPPER    , y = (wear / replace) LIMIT
								//      Line 2:
								// 			start: x = smu LOWER    , y = (wear / replace) NEW
								//			end:   x = smu UPPER    , y = (wear / replace) LIMIT
								if (index == subAssembly.wearTests.length - 1) {
									firstGreyLine.push([wearTest.lifeLower, wearTest.uniqueDetails['new']]); //start
									firstGreyLine.push([wearTest.uniqueDetails['lifeUpper'], wearTest.uniqueDetails['limit']]); //end

									secondGreyLine.push([wearTest.lower, wearTest.uniqueDetails['new']]);
									secondGreyLine.push([wearTest.upper, wearTest.uniqueDetails['limit']]);
								}
							}
						});

						if (scatterPlot.length != 0 && regressionLine.length != 0 && firstGreyLine.length != 0 && secondGreyLine.length != 0) {
							subAssembly.wearTestGraphs = [
								createWearGraph(subAssembly.name + ' - Wear Test', regressionLine, scatterPlot, firstGreyLine, secondGreyLine)
							];
						}
					}

					if (subAssembly.oilTestGraphs.length > 0 || subAssembly.wearTestGraphs.length > 0) {
						$scope.subAssemblies.push(subAssembly);
					}
				});

				$scope.checkLoading();
			}
		);

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

		var createWearGraph = function (graphName, regressionLine, scatterPlot, greyLineOne, greyLineTwo) {
			return {
				xAxis: {},
				yAxis: {},
				title: {
					text: graphName
				},
				legend: {
					enabled: false
				},
				series: [{
					type: 'line',
					data: regressionLine,
					marker: {
						enabled: false
					},
					states: {
						hover: {
							lineWidth: 0
						}
					},
					enableMouseTracking: false
				}, {
					type: 'scatter',
					data: scatterPlot,
					marker: {
						radius: 4
					}
				}, {
					type: 'line',
					data: greyLineOne,
					marker: {
						enabled: false
					}
				}, {
					type: 'line',
					data: greyLineTwo,
					marker: {
						enabled: false
					}
				}]
			};
		};

		$scope.download = function () {

		};

		LayoutService.getPageHeader().onClicked($scope.download);
	}]);