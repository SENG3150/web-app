//controller to allow the creation of new machines
angular
	.module('joy-global')
	.controller('DomainExpertMachinesControllerCreate', ['$scope', '$state', 'LayoutService', 'Machines', 'toastr', 'Models', function ($scope, $state, LayoutService, Machines, toastr, Models) {
		$scope.loading = true;

		$scope.machine = {
			name: '',
			model: {
				id: null,
				name: null
			}
		};

		$scope.selectedModel = null;

		LayoutService.reset();
		LayoutService.setTitle(['New Machine', 'Machines']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-machines-index',
				displayName: 'Machines'
			},
			{
				route: 'domainExpert-machines-create',
				displayName: 'New Machine'
			}
		]);

		Models.getList()
			.then(function (data) {
				$scope.loading = false;

				$scope.models = _.sortBy(data, function (item) {
					return item.name.toLowerCase();
				});

				if ($scope.models.length > 0) {
					$scope.setModel($scope.models[0]);
				}
			});

		$scope.setModel = function (model) {
			$scope.selectedModel = model;
			$scope.machine.model = model;
		};

		$scope.submitModel = function () {
			if ($scope.validate() == true) {
				Machines.post($scope.machine)
					.then(function () {
						toastr.clear();
						toastr.success('Model was created successfully.');
						$state.go('domainExpert-machines-index');
					}, function () {
						toastr.clear();
						toastr.error('There was an error creating the model.');
					});
			}
		};

		$scope.validate = function () {
			if ($scope.machine.name == '' || $scope.machine.name == null) {
				toastr.clear();
				toastr.error('Enter Machine name.');
				return false;
			}

			if ($scope.machine.model.id == '' || $scope.machine.model.id == null) {
				toastr.clear();
				toastr.error('Please choose a Model.');
				return false;
			}

			return true;
		};

		LayoutService.getPageHeader().onClicked($scope.submitModel);
	}]);