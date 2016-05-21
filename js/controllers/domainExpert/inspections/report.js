angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerReport', ['$scope', 'Inspections', 'moment', '$stateParams', function ($scope, Inspections, moment, $stateParams) {
		$scope.inspectionId = $stateParams.id;
		var baseInspections = Inspections.one($scope.inspectionId).get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
		});
		$scope.inspection = baseInspections.$object;

		$scope.moment = moment;

		$scope.oilTestGraphs = [];

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
		}

		baseInspections.then(function(inspection) {
			var currentDate = moment($scope.inspection.timeCompleted).valueOf();

			for (var majorAssemblyID in inspection.majorAssemblies) {
				var majorAssembly = inspection.majorAssemblies[majorAssemblyID];

				for (var subAssemblyID in majorAssembly.subAssemblies) {
					var subAssembly = majorAssembly.subAssemblies[subAssemblyID];

					//check to see if the assembly has an oil test to be graphed
					if (subAssembly.oilTest != null) {
						var oilTest = subAssembly.oilTest;

						var graphOne = [
							{
								name: "Sodium (Na)",
								data: [
									[currentDate, parseInt(oilTest.sodium)]
								]
							},
							{
								name: "Silicon (Si)",
								data: [
									[currentDate, parseInt(oilTest.silicon)]
								]
							},
							{
								name: "aluminium (Al)",
								data: [
									[currentDate, parseInt(oilTest.aluminium)]
								]
							}
						];

						var graphTwo = [
							{
								name: "Iron (Fe)",
								data: [
									[currentDate, parseInt(oilTest.iron)]
								]
							},
							{
								name: "PQ90",
								data: [
									[currentDate, parseInt(oilTest.pq90)]
								]
							}
						];

						var graphThree = [
							{
								name: "Lead (Pb)",
								data: [
									[currentDate, parseInt(oilTest.lead)]
								]
							},
							{
								name: "Copper (Cu)",
								data: [
									[currentDate, parseInt(oilTest.copper)]
								]
							},
							{
								name: "Tin (Sn)",
								data: [
									[currentDate, parseInt(oilTest.tin)]
								]
							}
						];

						var graphFour = [
							{
								name: "Water",
								data: [
									[currentDate, parseInt(oilTest.water)]
								]
							}
						];

						var graphFive = [
							{
								name: "Viscosity (460)",
								data: [
									[currentDate, oilTest.viscosity]
								]
							}
						];

						//add the graph configs to oilTestGraphs
						$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.subAssembly.name, graphOne));
						$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.subAssembly.name, graphTwo));
						$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.subAssembly.name, graphThree));
						$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.subAssembly.name, graphFour));
						$scope.oilTestGraphs.push(createTimeLineGraph(subAssembly.subAssembly.name, graphFive));
					}
				}
			}
		});
	}]);