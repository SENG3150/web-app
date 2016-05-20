angular
	.module('joy-global')
	.service('DataTablesService', [function () {
		this.domButtons = "<'row'<'col-sm-3'l><'col-sm-9'Bf>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>";
		this.dom = "<'row'<'col-sm-3'l><'col-sm-9'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>";

		this.buttons = function (title) {
			return [
				{
					extend: 'copy',
					text: 'Copy To Clipboard',
					exportOptions: {
						columns: ':visible'
					}
				},
				{
					extend: 'csv',
					text: 'CSV',
					title: title,
					exportOptions: {
						columns: ':visible'
					}
				},
				{
					extend: 'excel',
					text: 'Excel',
					title: title,
					exportOptions: {
						columns: ':visible'
					}
				},
				{
					extend: 'pdf',
					text: 'PDF',
					title: title,
					exportOptions: {
						columns: ':visible'
					}
				},
				{
					extend: 'print',
					text: 'Print',
					title: title,
					exportOptions: {
						columns: ':visible'
					}
				}
			]
		};

		var self = this;

		this.prepare = function (title, empty, buttons) {
			var emptyTable = 'No matching records found.';
			var showButtons = false;

			if (typeof empty != 'undefined' && empty != '' && empty != null && empty != false) {
				emptyTable = empty;
			}

			if (typeof buttons == 'undefined' || buttons == true) {
				showButtons = true;
			}

			if (showButtons == true) {
				return {
					dom: self.domButtons,
					buttons: self.buttons(title),
					language: {
						emptyTable: emptyTable
					}
				};
			} else {
				return {
					dom: self.dom,
					language: {
						emptyTable: emptyTable
					}
				};
			}
		}
	}]);