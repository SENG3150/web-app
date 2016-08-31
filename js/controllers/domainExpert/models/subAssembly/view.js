//Controller to edit a sub assembly
angular
	.module('joy-global')
	.controller('DomainExpertModelsViewSubAssemblyControllerView', ['$scope', 'LayoutService', '$state', 'DataTablesService', 'SubAssemblies', '$stateParams', 'toastr', '_', function ($scope, LayoutService, $state, DataTablesService, SubAssemblies, $stateParams, toastr, _) {
		$scope.modelId = $stateParams.id;
		$scope.majorAssemblyId = $stateParams.majorAssemblyId;
		$scope.subAssemblyId = $stateParams.subAssemblyId;

		$scope.uniqueDetails = [];

		$scope.loading = true;

		LayoutService.reset();
		LayoutService.setTitle(['Edit Sub Assembly', 'View Model', 'Models']);
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
				route: 'domainExpert-models-view-subAssembly-view({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ', subAssembly: ' + $scope.subAssemblyId + ' })',
				displayName: 'Edit Sub Assembly'
			}
		]);

		SubAssemblies.one($scope.subAssemblyId).get({include: 'majorAssembly.model'}).then(function (data) {
			$scope.loading = false;

			$scope.subAssembly = data;
			$scope.majorAssembly = $scope.subAssembly.majorAssembly;
			$scope.model = $scope.majorAssembly.model;

			angular.forEach($scope.subAssembly.uniqueDetails, function (uniqueDetail) {
				$scope.uniqueDetails.push({
					uniqueDetail: uniqueDetail
				});
			});

			LayoutService.reset();
			LayoutService.setTitle(['Edit ' + $scope.subAssembly.name, $scope.model.name, 'Models']);
			LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
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
					route: 'domainExpert-models-view-subAssembly-view({ id: ' + $scope.modelId + ', majorAssembly: ' + $scope.majorAssemblyId + ', subAssembly: ' + $scope.subAssemblyId + ' })',
					displayName: 'Edit ' + $scope.subAssembly.name
				}
			]);

			LayoutService.getPageHeader().onClicked($scope.save);
		});

		$scope.save = function () {
			if ($scope.validate() == true) {
				$scope.subAssembly.uniqueDetails = _.filter(
					_.pluck(
						$scope.uniqueDetails,
						'uniqueDetail'
					),
					function (uniqueDetail) {
						return uniqueDetail != null && uniqueDetail != '';
					}
				);

				$scope.subAssembly.post()
					.then(function () {
						toastr.clear();
						toastr.success('Sub assembly was updated successfully.');
						$state.go('domainExpert-models-view', {id: $scope.modelId});
					}, function () {
						toastr.clear();
						toastr.error('There was an error updating the sub assembly.');
					});
			}
		};

		$scope.validate = function () {
			if ($scope.subAssembly.name == '' || $scope.subAssembly.name == null) {
				toastr.clear();
				toastr.error('Enter a sub assembly name.');
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