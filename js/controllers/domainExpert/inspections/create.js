//allow for the creation of new Inspections to take place.
angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerCreate', ['$scope', 'Inspections', 'Machines', 'Technicians', 'AuthService', '_', 'LayoutService', 'toastr', '$state', function ($scope, Inspections, Machines, Technicians, AuthService, _, LayoutService, toastr, $state) {
		$scope.loading = true;
		$scope.loadingMachines = true;
		$scope.loadingTechnicians = true;

		$scope.selectedMachine = null;
		$scope.selectedTechnician = null;

		$scope.scheduledSubAssemblies = 0;
		$scope.scheduledTests = 0;

		// Data required to create an inspection
		$scope.inspection = {
			timeScheduled: moment().add(7, 'days'),
			machine: $scope.selectedMachine,
			technician: $scope.selectedTechnician,
			scheduler: AuthService.getUser().primary.id,
			selectedMajorAssemblies: {},
			majorAssemblies: []
		};

		LayoutService.reset();
		LayoutService.setTitle(['Schedule Inspection', 'Inspections']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-check"></i> Save</button>');
		LayoutService.getPageHeader().setBreadcrumbs([
			{
				route: 'domainExpert-index',
				displayName: 'Home'
			},
			{
				route: 'domainExpert-inspections-index',
				displayName: 'Inspections'
			},
			{
				route: 'domainExpert-inspections-create',
				displayName: 'Schedule Inspection'
			}
		]);

		// API call to the server to display all of the major assemblies and sub assemblies for the machine model
		Machines.getList({include: 'model.majorAssemblies.subAssemblies.tests'}).then(
			function (data) {
				$scope.loadingMachines = false;

				$scope.machines = _.sortBy(data, function (item) {
					return item.name.toLowerCase();
				});

				if ($scope.machines.length > 0) {
					$scope.setMachine($scope.machines[0]);
				}

				$scope.checkLoading();
			}
		);

		// API call to the server to list all of the technicians in the system
		Technicians.getList().then(
			function (data) {
				$scope.loadingTechnicians = false;

				$scope.technicians = _.sortBy(
					_.filter(data, function (item) {
							return item.expired == false;
						}
					),
					function (item) {
						return item.name.toLowerCase();
					});

				if ($scope.technicians.length > 0) {
					$scope.setTechnician($scope.technicians[0]);
				}

				$scope.checkLoading();
			}
		);

		// Checks if the data is still being loaded or not
		$scope.checkLoading = function () {
			if ($scope.loadingMachines == false && $scope.loadingTechnicians == false) {
				$scope.loading = false;
			}
		};

		// Adds the selected tests to the inspection
		$scope.updateScheduledTests = function () {
			$scope.scheduledSubAssemblies = 0;
			$scope.scheduledTests = 0;

			angular.forEach($scope.inspection.selectedMajorAssemblies, function (majorAssembly, majorAssemblyId) {
				var modelMajorAssembly = _.find($scope.selectedMachine.model.majorAssemblies, function (item) {
					return item.id == majorAssemblyId;
				});

				angular.forEach(majorAssembly, function (subAssembly, subAssemblyId) {
						if (subAssembly == true) {
							$scope.scheduledSubAssemblies++;

							var modelSubAssembly = _.find(modelMajorAssembly.subAssemblies, function (item) {
								return item.id == subAssemblyId;
							});

							if (modelSubAssembly.machineGeneral == true) {
								$scope.scheduledTests++;
							}

							if (modelSubAssembly.oil == true) {
								$scope.scheduledTests++;
							}

							if (modelSubAssembly.wear == true) {
								$scope.scheduledTests++;
							}
						}
					}
				)
			});
		};

		// Sets the chosen machine for the inspection
		$scope.setMachine = function (machine) {
			$scope.selectedMachine = machine;
			$scope.inspection.machine = machine.id;

			$scope.inspection.selectedMajorAssemblies = {};

			angular.forEach(machine.model.majorAssemblies, function (majorAssembly) {
				$scope.inspection.selectedMajorAssemblies[majorAssembly.id] = {};

				angular.forEach(majorAssembly.subAssemblies, function (subAssembly) {
					$scope.inspection.selectedMajorAssemblies[majorAssembly.id][subAssembly.id] = false;
				});
			});

			$scope.updateScheduledTests();
		};

		// Sets the chosen technician for the inspection
		$scope.setTechnician = function (technician) {
			$scope.selectedTechnician = technician;
			$scope.inspection.technician = technician.id;
		};

		$scope.toggleMajorAssembly = function (majorAssembly) {
			angular.forEach($scope.inspection.selectedMajorAssemblies[majorAssembly], function (value, key) {
				$scope.inspection.selectedMajorAssemblies[majorAssembly][key] = !value;
			});

			$scope.updateScheduledTests();
		};

		$scope.toggleSubAssembly = function (majorAssembly, subAssembly) {
			$scope.inspection.selectedMajorAssemblies[majorAssembly][subAssembly] = !$scope.inspection.selectedMajorAssemblies[majorAssembly][subAssembly];

			$scope.updateScheduledTests();
		};

		// POST the inspection  data to the server
		$scope.save = function () {
			$scope.updateScheduledTests();

			toastr.clear();

			if ($scope.scheduledTests > 0) {				// Checks if any tests have been selected
				$scope.inspection.majorAssemblies = [];

				angular.forEach($scope.inspection.selectedMajorAssemblies, function (majorAssembly, majorAssemblyId) {
					var local = {
						majorAssembly: majorAssemblyId,
						subAssemblies: []
					};

					angular.forEach(majorAssembly, function (subAssembly, subAssemblyId) {
							if (subAssembly == true) {
								local.subAssemblies.push({
									subAssembly: subAssemblyId
								});
							}
						}
					);

					if (local.subAssemblies.length > 0) {
						$scope.inspection.majorAssemblies.push(local);
					}
				});

				var inspection = _.clone($scope.inspection);

				delete inspection.selectedMajorAssemblies;

				Inspections.getBulk().post(inspection).then(
					function () {
						toastr.success('The inspection was scheduled successfully.');

						$state.go('domainExpert-inspections-index');
					},
					function () {
						toastr.error('There was an error while scheduling the inspection.', 'Error');
					}
				)
			} else {
				toastr.warning('You must schedule at least 1 test.');
			}
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);