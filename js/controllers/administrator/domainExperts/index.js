angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerIndex', ['$scope', 'DomainExperts', 'LayoutService', '$state', function ($scope, DomainExperts, LayoutService, $state) {

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

		$scope.domainExperts = DomainExperts.getList().$object;

		$scope.goTo = function() {
			$state.go('administrator-domainExperts-create');
		}

		LayoutService.getPageHeader().onClicked($scope.goTo);
	}]);