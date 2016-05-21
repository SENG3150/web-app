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
						month: '%e. %b',
						year: '%b'
					}
				},
				yAxis: {
					min: 0
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
									[$scope.inspection.timeCompleted, parseInt(oilTest.sodium)]
								]
							},
							{
								name: "Silicon (Si)",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.silicon)]
								]
							},
							{
								name: "aluminium (Al)",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.aluminium)]
								]
							}
						];

						var graphTwo = [
							{
								name: "Iron (Fe)",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.iron)]
								]
							},
							{
								name: "PQ90",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.pq90)]
								]
							}
						];

						var graphThree = [
							{
								name: "Lead (Pb)",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.lead)]
								]
							},
							{
								name: "Copper (Cu)",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.copper)]
								]
							},
							{
								name: "Tin (Sn)",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.tin)]
								]
							}
						];

						var graphFour = [
							{
								name: "Water",
								data: [
									[$scope.inspection.timeCompleted, parseInt(oilTest.water)]
								]
							}
						];

						var graphFive = [
							{
								name: "Viscosity (460)",
								data: [
									[$scope.inspection.timeCompleted, oilTest.viscosity]
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