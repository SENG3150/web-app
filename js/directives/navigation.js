angular
	.module('joy-global')
	.directive('navigation', ['AuthService', function (AuthService) {
		return {
			restrict: 'A',
			scope: true,
			replace: true,
			template: '<div ng-include="template"></div>',
			link: function (scope) {
				scope.user = AuthService.getUser();

				scope.template = 'views/common/navigation/' + scope.user.type + '.html';
			}
		};
	}]);