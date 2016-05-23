angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerView', ['$scope', 'DomainExperts', '$stateParams', 'LayoutService', function ($scope, DomainExperts, $stateParams, LayoutService) {
		$scope.domainExpertsId = $stateParams.id;
		$scope.loading = true;

		DomainExperts.one($scope.domainExpertsId).get().then(
			function(data) {
				$scope.loading = false;
				$scope.domainExpert = data;

				LayoutService.setTitle([$scope.domainExpert.name, 'DomainExperts']);
				LayoutService.getPageHeader().setBreadcrumbs([
					{
						route: 'administrator-index',
						displayName: 'Home'
					},
					{
						route: 'administrator-domainExperts-index',
						displayName: 'Domain Experts'
					},
					{
						route: 'administrator-domainExperts-view',
						displayName: $scope.domainExpert.name
					}
				]);
			});

		LayoutService.reset();
		LayoutService.setTitle(['DomainExpert', 'DomainExperts']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'administrator-index',
				displayName: 'Home'
			},
			{
				route: 'administrator-domainExperts-index',
				displayName: 'Domain Experts'
			},
			{
				route: 'administrator-domainExperts-view',
				displayName: 'Domain Expert'
			}
		]);

		$scope.save = function() {
			console.log('Update this code to save it.');
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);