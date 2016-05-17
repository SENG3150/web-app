angular
	.module('joy-global')
	.directive('currentDate', ['$filter', function ($filter) {
		return {
			link: function ($scope, $element, $attrs) {
				$element.text($filter('date')(new Date(), $attrs.currentDate));
			}
		};
	}]);