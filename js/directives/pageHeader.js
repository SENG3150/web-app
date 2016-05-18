angular
	.module('joy-global')
	.directive('pageHeader', ['$rootScope', 'PageHeaderService', function ($rootScope, PageHeaderService) {
		return {
			restrict: 'A',
			templateUrl: 'views/common/pageHeader.html',
			link: function (scope) {
				scope.update = function () {
					scope.title = PageHeaderService.getTitle();
					scope.subtitle = PageHeaderService.getSubtitle();
					scope.description = PageHeaderService.getDescription();
					scope.breadcrumbs = PageHeaderService.getBreadcrumbs();
					scope.actionButton = PageHeaderService.getActionButton();
				};

				$rootScope.$on('pageHeaderService.updated', scope.update);

				scope.update();

				scope.actionButtonClicked = function () {
					PageHeaderService.fireClickedEvent();
				};
			}
		}
	}]);