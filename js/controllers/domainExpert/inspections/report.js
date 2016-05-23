angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerReport', ['$scope', 'Inspections', 'moment', '$stateParams', function ($scope, Inspections, moment, $stateParams) {
		$scope.inspectionId = $stateParams.id;
		var baseInspections = Inspections.one($scope.inspectionId);

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

						lead.push([oilTest.timeCompleted, parseFloat(oilTest.lead)]);
						copper.push([oilTest.timeCompleted, parseFloat(oilTest.copper)]);
						tin.push([oilTest.timeCompleted, parseFloat(oilTest.tin)]);
						iron.push([oilTest.timeCompleted, parseFloat(oilTest.iron)]);
						pq90.push([oilTest.timeCompleted, parseFloat(oilTest.pq90)]);
						silicon.push([oilTest.timeCompleted, parseFloat(oilTest.silicon)]);
						sodium.push([oilTest.timeCompleted, parseFloat(oilTest.sodium)]);
						aluminium.push([oilTest.timeCompleted, parseFloat(oilTest.aluminium)]);
						water.push([oilTest.timeCompleted, parseFloat(oilTest.water)]);
						viscosity.push([oilTest.timeCompleted, parseFloat(oilTest.viscosity)]);
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

				if (subAssembly.wearTests.length > 0) {
					for (var testID in subAssembly.wearTests) {
						var wearTest = subAssembly.wearTests[testID];

						//scatter plot: x = SMU, y = (value on wear / replace)
						//line of best fit between scatter plots

						//grey line:
						//      Line 1:
						// 			start: x = smu LOWER    , y = (wear / replace) NEW
						//			end:   x = (wear / replace) UPPER    , y = (wear / replace) LIMIT
						//      Line 2:
						// 			start: x = smu LOWER    , y = (wear / replace) NEW
						//			end:   x = smu UPPER    , y = (wear / replace) LIMIT

					}
				}
			}
		});
	}]);