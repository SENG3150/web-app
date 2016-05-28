angular
	.module('joy-global')
	.service('DomainExpertInspectionReportService', ['$http', 'ENV', '$window', '$auth', function ($http, ENV, $window, $auth) {
		this.download = function (inspection, request, redirect) {
			if (redirect == undefined || redirect == true) {
				return this.open('POST', ENV.apiEndpoint + 'inspections/' + inspection + '/download?token=' + $auth.getToken(), request, '_blank');
			} else {
				return ENV.apiEndpoint + 'inspections/' + inspection + '/download?token=' + $auth.getToken();
			}
		};

		// http://stackoverflow.com/a/17793207
		this.open = function (verb, url, data, target) {
			var form = document.createElement("form");
			form.action = url;
			form.method = verb;
			form.target = target || "_self";

			if (data) {
				for (var key in data) {
					var input = document.createElement("textarea");
					input.name = key;
					input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
					form.appendChild(input);
				}
			}

			form.style.display = 'none';
			document.body.appendChild(form);
			form.submit();
			document.body.removeChild(form);
		};
	}]);