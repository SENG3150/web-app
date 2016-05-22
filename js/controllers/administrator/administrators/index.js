angular
	.module('joy-global')
	.controller('AdministratorAdministratorsControllerIndex', ['$scope', 'Administrators', 'LayoutService', '$state', function ($scope, Administrators, LayoutService, $state) {

		LayoutService.reset();
		LayoutService.setTitle(['Administrators']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Administrator</button>');

		$scope.administrators = Administrators.getList().$object;

		$scope.goTo = function() {
			$state.go('administrator-administrators-create');
		}

		LayoutService.getPageHeader().onClicked($scope.goTo);
	}]);
