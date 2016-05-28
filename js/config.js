angular
	.module('joy-global')
	.config(['$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', '$authProvider', 'ENV', 'RestangularProvider', function ($urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $authProvider, ENV, RestangularProvider) {
		RestangularProvider.setBaseUrl(ENV.apiEndpoint);

		$authProvider.loginUrl = ENV.apiEndpoint + 'auth/authenticate';

		$urlRouterProvider.otherwise('/');

		$ocLazyLoadProvider.config({
			debug: false,
			modules: [
				{
					name: 'dataTables',
					files: [
						'/css/plugins/dataTables/datatables.min.css',
						'/js/plugins/dataTables/datatables.min.js',
						'/bower_components/angular-datatables/dist/angular-datatables.js',
						'/js/plugins/dataTables/datatables.bootstrap.min.js',
						'/js/plugins/dataTables/datatables.buttons.min.js',
						'/js/plugins/dataTables/buttons.bootstrap.min.js',
						'/js/plugins/dataTables/jszip.min.js',
						'/js/plugins/dataTables/pdfmake.min.js',
						'/js/plugins/dataTables/vfs_fonts.js',
						'/js/plugins/dataTables/buttons.html5.min.js'
					],
					serie: true
				},
				{
					name: 'dateTimePicker',
					files: [
						'/bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
						'/bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js'
					],
					serie: true
				},
				{
					name: 'highcharts',
					files: [
						'/bower_components/highcharts/highcharts.js',
						'/bower_components/highcharts-ng/dist/highcharts-ng.min.js'
					],
					serie: true
				},
				{
					name: 'ngJsTree',
					files: [
						'/bower_components/jstree/dist/themes/default/style.min.css',
						'/bower_components/jstree/dist/jstree.min.js',
						'/bower_components/ng-js-tree/dist/ngJsTree.min.js'
					],
					serie: true
				}
			]
		});

		$locationProvider.html5Mode(true);
	}]);