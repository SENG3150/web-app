// Controller to add a major assembly to a model
angular
	.module('joy-global')
	.controller('DomainExpertModelsViewMajorAssemblyControllerCreate', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'MajorAssemblies', '$stateParams', 'toastr', 'Models', function ($scope, LayoutService, $state, DataTablesService, MajorAssemblies, $stateParams, toastr, Models) {
		$scope.modelId = $stateParams.id;

		$scope.loading = true;

		$scope.majorAssembly = {
			name: ''
		};

		LayoutService.reset();
		LayoutService.setTitle(['Add Major Assembly', 'View Model', 'Models']);
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-models-index',
				displayName: 'Models'
			},
			{
				route: 'domainExpert-models-view({ id: ' + $scope.modelId + ' })',
				displayName: 'View Model'
			},
			{
				route: 'domainExpert-models-view-majorAssembly-create({ id: ' + $scope.modelId + ' })',
				displayName: 'Add Major Assembly'
			}
		]);

		Models
			.one($scope.modelId)
			.get()
			.then(function (data) {
				$scope.loading = false;
				$scope.model = data;

				LayoutService.reset();
				LayoutService.setTitle(['Add Major Assembly', $scope.model.name, 'Models']);
				LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Add</button>');
				LayoutService.getPageHeader().setBreadcrumbs([
					{
						route: 'domainExpert-index',
						displayName: 'Home'
					},
					{
						route: 'domainExpert-models-index',
						displayName: 'Models'
					},
					{
						route: 'domainExpert-models-view({ id: ' + $scope.modelId + ' })',
						displayName: $scope.model.name
					},
					{
						route: 'domainExpert-models-view-majorAssembly-create({ id: ' + $scope.modelId + ' })',
						displayName: 'Add Major Assembly'
					}
				]);

				LayoutService.getPageHeader().onClicked($scope.save);
			});

		$scope.save = function () {
			if ($scope.validate() == true) {
				$scope.majorAssembly.model = $scope.modelId;

				MajorAssemblies.post($scope.majorAssembly)
					.then(function () {
						toastr.clear();
						toastr.success('Major Assembly was created successfully.');
						$state.go('domainExpert-models-view', {id: $scope.modelId});
					}, function () {
						toastr.clear();
						toastr.error('There was an error creating the Major Assembly.');
					});
			}
		};

		$scope.validate = function () {
			if ($scope.majorAssembly.name == '' || $scope.majorAssembly.name == null) {
				toastr.clear();
				toastr.error('Enter major assembly name.');
				return false;
			}

			return true;
		};
	}]);