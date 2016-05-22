angular
	.module('joy-global')
	.controller('AdministratorTechniciansControllerIndex', ['$scope', 'Technicians', 'LayoutService',  '$state',  function ($scope, Technicians, LayoutService, $state) {

		LayoutService.reset();
		LayoutService.setTitle(['Technicians']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Technician</button>');

		$scope.technicians = Technicians.getList().$object;

		$scope.goTo = function() {
			$state.go('administrator-technicians-create');
		}

		LayoutService.getPageHeader().onClicked($scope.goTo);
	}]);