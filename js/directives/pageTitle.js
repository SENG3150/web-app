angular
	.module('joy-global')
	.directive('pageTitle', ['LayoutService', '$timeout', function (LayoutService, $timeout) {
		return {
			link: function (scope, element) {
				LayoutService.onUpdated(function () {
					var title = 'Joy Global';

					if (LayoutService.getTitle()) {
						if (angular.isArray(LayoutService.getTitle()) == true) {
							title = LayoutService.getTitle().join(' - ') + ' - Joy Global';
						} else {
							title = LayoutService.getTitle() + ' - Joy Global';
						}
					}

					$timeout(function () {
						element.text(title);
					});
				});
			}
		}
	}]);