angular
	.module('joy-global')
	.filter('unsafe', ['$sce', function ($sce) {
		return $sce.trustAsHtml;
	}]);