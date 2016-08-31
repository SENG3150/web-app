// Controller to add a sub assembly to a models major assembly
angular
	.module('joy-global')
	.controller('DomainExpertModelsViewSubAssemblyControllerCreate', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'SubAssemblies', '$stateParams', 'toastr', 'Models', function ($scope, LayoutService, $state, DataTablesService, SubAssemblies, $stateParams, toastr, Models) {
		$scope.modelId = $stateParams.id;
		$scope.majorAssemblyId = $stateParams.majorAssemblyId;

		$scope.subAssembly = {
			name: null,
			machineGeneral: false,
			oil: false,
			wear: false,
			uniqueDetails: []
		};

		$scope.uniqueDetails = [];

		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Add Sub Assembly', 'View Model', 'Models']);
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
				displayName: 'Edit Model'
			},
			{
				route: 'domainExpert-models-view-subAssembly-create({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ' })',
				displayName: 'Add Sub Assembly'
			}
		]);

		Models
			.one($scope.modelId)
			.get()
			.then(function (data) {
				$scope.loading = false;
				$scope.model = data;

				LayoutService.reset();
				LayoutService.setTitle(['Add Sub Assembly', $scope.model.name, 'Models']);
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
						route: 'domainExpert-models-view-subAssembly-create({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ' })',
						displayName: 'Add Sub Assembly'
					}
				]);

				LayoutService.getPageHeader().onClicked($scope.save);
			});

		$scope.save = function () {
			if ($scope.validate() == true) {
				$scope.subAssembly.majorAssembly = $scope.majorAssemblyId;

				$scope.subAssembly.uniqueDetails = _.filter(
					_.pluck(
						$scope.uniqueDetails,
						'uniqueDetail'
					),
					function (uniqueDetail) {
						return uniqueDetail != null && uniqueDetail != '';
					}
				);

				SubAssemblies.post($scope.subAssembly)
					.then(function () {
						toastr.clear();
						toastr.success('Sub assembly was created successfully.');
						$state.go('domainExpert-models-view', {id: $scope.modelId});
					}, function () {
						toastr.clear();
						toastr.error('There was an error creating the sub assembly.');
					});
			}
		};

		$scope.validate = function () {
			if ($scope.subAssembly.name == '' || $scope.subAssembly.name == null) {
				toastr.clear();
				toastr.error('Enter sub assembly name.');
				return false;
			}

			return true;
		};

		$scope.addUniqueDetail = function () {
			$scope.uniqueDetails.push({
				uniqueDetail: ''
			});
		};

		$scope.removeUniqueDetail = function (index) {
			$scope.uniqueDetails.splice(index, 1);
		};
	}]);