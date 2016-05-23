angular
	.module('joy-global')
	.controller('AdministratorDomainExpertsControllerView', ['$scope', 'DomainExperts', '$stateParams', 'LayoutService', 'moment', function ($scope, DomainExperts, $stateParams, LayoutService, moment) {
		$scope.domainExpertsId = $stateParams.id;
		$scope.loading = true;

		DomainExperts.one($scope.domainExpertsId).get().then(
			function(data) {
				$scope.loading = false;
				$scope.domainexpert = data;

				LayoutService.setTitle([$scope.domainexpert.name, 'DomainExperts']);
				LayoutService.getPageHeader().setBreadcrumbs([
					{
						route: 'administrator-index',
						displayName: 'Home'
					},
					{
						route: 'administrator-domainexperts-index',
						displayName: 'DomainExperts'
					},
					{
						route: 'administrator-domainexperts-view',
						displayName: $scope.domainexpert.name
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
				route: 'administrator-domainexperts-index',
				displayName: 'DomainExperts'
			},
			{
				route: 'administrator-domainexperts-view',
				displayName: 'DomainExpert'
			}
		]);

		$scope.save = function() {
			console.log('Update this code to save it.');
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);