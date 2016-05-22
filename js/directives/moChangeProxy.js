angular
	.module('joy-global')
	.directive('moChangeProxy', ['$parse', function ($parse) {
		return {
			require: '^ngModel',
			restrict: 'A',
			link: function (scope, elm, attrs, ctrl) {
				var proxyExp = attrs.moChangeProxy;
				var modelExp = attrs.ngModel;

				scope.$watch(proxyExp, function (nVal) {
					if (nVal != ctrl.$modelValue) {
						$parse(modelExp).assign(scope, nVal);
					}
				});
				elm.bind('blur', function () {
					var proxyVal = scope.$eval(proxyExp);

					if (ctrl.$modelValue != proxyVal) {
						scope.$apply(function () {
							$parse(proxyExp).assign(scope, ctrl.$modelValue);
						});
					}
				});
			}
		};
	}]);