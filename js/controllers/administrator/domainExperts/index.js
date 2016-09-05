//Controller to show a list of all current domain experts in the system
angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerIndex', ['$scope', 'DomainExperts', 'LayoutService', '$state', 'DataTablesService', function ($scope, DomainExperts, LayoutService, $state, DataTablesService) {
		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Domain Experts']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> New Domain Expert</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			},
			{
				route: 'administrator-domainExperts-index',
				displayName: 'Domain Experts'
			}
		]);

		//Return a list of all Domain Experts
		DomainExperts.getList().then(function (data) {
			$scope.loading = false;
			$scope.domainExperts = data;
		});

		$scope.goTo = function() {
			$state.go('administrator-domainExperts-create');
		};

		LayoutService.getPageHeader().onClicked($scope.goTo);

		$scope.dtOptions = DataTablesService.prepare('Domain Experts');
	}]);