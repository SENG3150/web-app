angular
	.module('joy-global')
	.directive('minimalizeSidebar', [function () {
		return {
			restrict: 'A',
			template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
			controller: ['$scope', function ($scope) {
				$scope.minimalize = function () {
					var body = $('body');

					body.toggleClass("mini-navbar");

					if (!body.hasClass('mini-navbar') || body.hasClass('body-small')) {
						// Hide menu in order to smoothly turn on when maximize menu
						$('#side-menu').hide();
						// For smoothly turn on menu
						setTimeout(
							function () {
								$('#side-menu').fadeIn(400);
							}, 200);
					} else if ($('body').hasClass('fixed-sidebar')) {
						$('#side-menu').hide();
						setTimeout(
							function () {
								$('#side-menu').fadeIn(400);
							}, 100);
					} else {
						// Remove all inline style from jquery fadeIn function to reset menu state
						$('#side-menu').removeAttr('style');
					}
				}
			}]
		};
	}]);