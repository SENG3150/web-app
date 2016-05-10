angular
	.module('joy-global')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('domainExpert-inspections-view', {
				parent: 'domainExpert',
				url: '/inspections/:id',
				templateUrl: 'views/domainExpert/inspections/view.html',
				controller: 'DomainExpertInspectionsControllerView',
				resolve: {
					loggedIn: ['AuthService', function (AuthService) {
						return AuthService.checkPermissions(true);
					}]
				}
			});
	}]);