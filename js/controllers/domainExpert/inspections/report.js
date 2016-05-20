angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerReport', ['$scope', 'Inspections', 'moment', '$stateParams', function ($scope, Inspections, moment, $stateParams) {
		$scope.inspectionId = $stateParams.id;

		$scope.inspection = Inspections.one($scope.inspectionId).get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
		}).$object;

		$scope.moment = moment;

		var datasets = [
			{
				data: [
					1,
					2,
					3,
					4
				],
				name: 'Cost',
				unit: 'Dollars',
				type: 'column',
				tooltip: {
					valuePrefix: '$'
				}
			},
			{
				data: [
					5,
					6,
					7,
					8
				],
				name: 'Hours',
				unit: 'Hours',
				type: 'column',
				yAxis: 1,
				tooltip: {
					valueSuffix: ' hours'
				}
			}
		];

		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			},
			colors: {
				0: '#C41230',
				1: '#818286'
			}
		});

		$scope.chartConfig = {
			options: {
				chart: {
					zoomType: 'xy'
				},
				title: {
					text: 'Spend Report'
				},
				xAxis: [{
					categories: [
						'Category 1',
						'Category 2',
						'Category 3',
						'Category 4'
					],
					crosshair: true
				}],
				yAxis: [
					{
						title: {
							text: 'Cost'
						},
						labels: {
							format: '${value}',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						}
					},
					{
						gridLineWidth: 0,
						title: {
							text: 'Hours'
						},
						labels: {
							format: '{value} hours',
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						},
						opposite: true
					}
				],
				tooltip: {
					shared: true
				},
				legend: {
					layout: 'vertical',
					align: 'left',
					x: 80,
					verticalAlign: 'top',
					y: 55,
					floating: true,
					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				}
			},
			series: datasets
		};
	}]);