angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerReport', ['$scope', 'Inspections', 'moment', '$stateParams', 'LayoutService', 'toastr', '$window', function ($scope, Inspections, moment, $stateParams, LayoutService, toastr, $window) {
		$scope.inspectionId = $stateParams.id;
		var baseInspections = Inspections.one($scope.inspectionId);

		LayoutService.reset();
		LayoutService.setTitle(['Inspection ' + $scope.inspectionId + ' Report']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
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
				route: 'domainExpert-inspections-report',
				displayName: 'Inspection ' + $scope.inspectionId + ' Report'
			}
		]);

		$scope.inspection = baseInspections.get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
		}).$object;
		$scope.moment = moment;
		$scope.oilTestGraphs = [];
		$scope.wearTestGraphs = [];

		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			},
			colors: {
				0: '#C41230',
				1: '#818286'
			}
		});

		createTimeLineGraph = function(graphTitle, traces) {
			var graphConfig = {
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
				yAxis: {
				},
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

			return graphConfig;
		};

		createWearGraph = function(graphName, regressionLine, scatterPlot, greyLineOne, greyLineTwo) {
			return {
				xAxis: {
				},
				yAxis: {
				},
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
				},{
					type: 'line',
					data: greyLineOne,
					marker: {
						enabled: false
					}
				},{
					type: 'line',
					data: greyLineTwo,
					marker: {
						enabled: false
					}
				}]
			};
		}

		baseInspections.one('graphs').get().then(function(historicalData) {
			//$scope.test = historicalData;
			for (var subAssemblyID in historicalData.subAssemblies) {
				var subAssembly = historicalData.subAssemblies[subAssemblyID];

				if (subAssembly.oilTests.length > 0) {

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

					for (var testID in subAssembly.oilTests) {
						var oilTest = subAssembly.oilTests[testID];
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
					}


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

					var graphFour = [
						{
							name: "Water",
							data: water
						}
					];

					var graphFive = [
						{
							name: "Viscosity (460)",
							data: viscosity
						}
					];

					$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.name, graphOne));
					$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.name, graphTwo));
					$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.name, graphThree));
					$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.name, graphFour));
					$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.name, graphFive));
				}


				//wear graph test
				if (subAssembly.wearTests.length > 0 && false) {
					var scatterPlot = [];
					var regressionLine = [];
					var firstGreyLine = [];
					var secondGreyLine = [];

					for (var testID in subAssembly.wearTests) {
						var wearTest = subAssembly.wearTests[testID];

						//scatter plot: x = SMU, y = (value on wear / replace)
						//line of best fit between scatter plots
						scatterPlot.push([wearTest.smu, wearTest.uniqueDetails.wearReplace]);
						regressionLine.push([wearTest.smu, wearTest.uniqueDetails.wearReplace]);

						//grey line:
						//      Line 1:
						// 			start: x = smu LOWER    , y = (wear / replace) NEW
						//			end:   x = (wear / replace) UPPER    , y = (wear / replace) LIMIT
						//      Line 2:
						// 			start: x = smu LOWER    , y = (wear / replace) NEW
						//			end:   x = smu UPPER    , y = (wear / replace) LIMIT
						if (testID == subAssembly.wearTests.length - 1) {
							firstGreyLine.push([wearTest.lower, wearTest.uniqueDetails.wearReplaceNew]); //start
							firstGreyLine.push((wearTest.uniqueDetails.wearReplaceUpper, wearTest.uniqueDetails.wearReplaceLimit)); //end

							secondGreyLine.push([wearTest.lower, wearTest.uniqueDetails.wearReplaceNew]);
							secondGreyLine.push([wearTest.upper, wearTest.uniqueDetails.wearReplaceNew]);
						}
					}

					$scope.wearTestGraphs.push(createWearGraph(subAssembly.name, regressionLine, scatterPlot, firstGreyLine, secondGreyLine));
				}
			}
		});

		$scope.toPdf = function() {
			var pdf = new jsPDF('p', 'mm', 'a4');
			var options = {
				pagesplit: true,
				background: '#FFFFFF'
			};

			pdf.addHTML(document.getElementById('printTable'), 0, 0, options, function() {
				console.log(document.getElementById('printTable'));
				pdf.save('test.pdf');
			});
/*
			html2canvas(document.getElementById('printGraph'), {
				allowTaint: true,
				background: '#FFFFFF',
				onrendered: function(canvas) {
					var doc = new jsPDF();
					var imgData = canvas.toDataURL('image/png');
					console.log(document.getElementById('printGraph'));
					doc.addImage(imgData, 'PNG', 10, 10);
					doc.save("test.pdf");
				}
			});
*/
		}

		LayoutService.getPageHeader().onClicked($scope.toPdf);
	}]);