angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerView', ['$scope', 'Inspections', 'moment', '$stateParams', 'LayoutService', 'toastr', '$auth', '$state', function ($scope, Inspections, moment, $stateParams, LayoutService, toastr, $auth, $state) {
		$scope.inspectionId = $stateParams.id;
		$scope.loading = true;

		$scope.moment = moment;
		$scope.token = $auth.getToken();

		LayoutService.reset();
		LayoutService.setTitle(['Inspection ' + $scope.inspectionId, 'Inspections']);
		LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-download"></i> Download Report</button>');
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
				route: 'domainExpert-inspections-view({ id: ' + $scope.inspectionId + ' })',
				displayName: 'Inspection ' + $scope.inspectionId
			}
		]);

		$scope.inspection = Inspections.one($scope.inspectionId).get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
		}).then(
			function (data) {
				$scope.loading = false;

				$scope.inspection = data;

				var rootNode = {
					id: 'root',
					text: 'Inspection ' + $scope.inspectionId,
					children: [],
					state: {
						opened: true,
						selected: true
					}
				};

				if ($scope.inspection.comments.length > 0 || $scope.inspection.photos.length > 0) {
					rootNode.a_attr = {
						class: 'text-highlight'
					};
				}

				angular.forEach($scope.inspection.majorAssemblies, function (majorAssembly) {
					var majorAssemblyNode = {
						id: ['root', majorAssembly.id].join('-'),
						text: majorAssembly.majorAssembly.name,
						children: [],
						state: {
							opened: true
						}
					};

					if (majorAssembly.comments.length > 0 || majorAssembly.photos.length > 0) {
						majorAssemblyNode.a_attr = {
							class: 'text-highlight'
						};
					}

					angular.forEach(majorAssembly.subAssemblies, function (subAssembly) {
						var subAssemblyNode = {
							id: ['root', majorAssembly.id, subAssembly.id].join('-'),
							text: subAssembly.subAssembly.name,
							children: [],
							state: {
								opened: true
							}
						};

						if (subAssembly.comments.length > 0 || subAssembly.photos.length > 0) {
							subAssemblyNode.a_attr = {
								class: 'text-highlight'
							};
						}

						if (subAssembly.machineGeneralTest) {
							var machineGeneralTestNode = {
								id: ['root', majorAssembly.id, subAssembly.id, 'machineGeneral'].join('-'),
								text: 'Machine General Test',
								type: 'machine-general-test',
								state: {
									opened: true
								}
							};

							if (subAssembly.machineGeneralTest.comments.length > 0 || subAssembly.machineGeneralTest.photos.length > 0) {
								machineGeneralTestNode.a_attr = {
									class: 'text-highlight'
								};
							}

							subAssemblyNode.children.push(machineGeneralTestNode);
						}

						if (subAssembly.oilTest) {
							var oilTestNode = {
								id: ['root', majorAssembly.id, subAssembly.id, 'oil'].join('-'),
								text: 'Oil Test',
								type: 'oil-test',
								state: {
									opened: true
								}
							};

							if (subAssembly.oilTest.comments.length > 0 || subAssembly.oilTest.photos.length > 0) {
								oilTestNode.a_attr = {
									class: 'text-highlight'
								};
							}

							subAssemblyNode.children.push(oilTestNode);
						}

						if (subAssembly.wearTest) {
							var wearTestNode = {
								id: ['root', majorAssembly.id, subAssembly.id, 'wear'].join('-'),
								text: 'Wear Test',
								type: 'wear-test',
								state: {
									opened: true
								}
							};

							if (subAssembly.wearTest.comments.length > 0 || subAssembly.wearTest.photos.length > 0) {
								wearTestNode.a_attr = {
									class: 'text-highlight'
								};
							}

							subAssemblyNode.children.push(wearTestNode);
						}

						majorAssemblyNode.children.push(subAssemblyNode);
					});

					rootNode.children.push(majorAssemblyNode);
				});

				$scope.treeData = [
					rootNode
				];

				$scope.parseNode('root');
			}
		);

		$scope.addComment = function() {
			toastr.clear();
			toastr.info('Coming soon.');
		};

		$scope.addPhoto = function() {
			toastr.clear();
			toastr.info('Coming soon.');
		};

		$scope.selectNode = function (node, selected) {
			$scope.parseNode(selected.node.id);
		};

		$scope.parseNode = function (node) {
			var parts = node.split('-');

			var majorAssembly = null;
			var subAssembly = null;
			var test = null;

			switch (parts.length) {
				case 1:
				{
					$scope.title = 'Inspection ' + $scope.inspection.id;
					$scope.type = 'inspection';
					$scope.node = $scope.inspection;
					$scope.comments = $scope.inspection.comments;
					$scope.photos = $scope.inspection.photos;

					break;
				}

				case 2:
				{
					majorAssembly = _.find($scope.inspection.majorAssemblies, function (item) {
						return item.id == parseInt(parts[1]);
					});

					$scope.title = majorAssembly.majorAssembly.name;
					$scope.type = 'majorAssembly';
					$scope.node = majorAssembly;
					$scope.comments = majorAssembly.comments;
					$scope.photos = majorAssembly.photos;

					break;
				}

				case 3:
				{
					majorAssembly = _.find($scope.inspection.majorAssemblies, function (item) {
						return item.id == parseInt(parts[1]);
					});

					subAssembly = _.find(majorAssembly.subAssemblies, function (item) {
						return item.id == parseInt(parts[2]);
					});

					$scope.title = subAssembly.subAssembly.name;
					$scope.type = 'subAssembly';
					$scope.node = subAssembly;
					$scope.comments = subAssembly.comments;
					$scope.photos = subAssembly.photos;

					break;
				}

				case 4:
				{
					majorAssembly = _.find($scope.inspection.majorAssemblies, function (item) {
						return item.id == parseInt(parts[1]);
					});

					subAssembly = _.find(majorAssembly.subAssemblies, function (item) {
						return item.id == parseInt(parts[2]);
					});

					switch (parts[3]) {
						case 'machineGeneral':
						{
							test = subAssembly.machineGeneralTest;

							$scope.title = 'Machine General Test';
							$scope.type = 'test-machineGeneral';

							break;
						}

						case 'oil':
						{
							test = subAssembly.oilTest;

							$scope.title = 'Oil Test';
							$scope.type = 'test-oil';

							break;
						}

						case 'wear':
						{
							test = subAssembly.wearTest;

							$scope.title = 'Wear Test';
							$scope.type = 'test-wear';

							break;
						}
					}

					$scope.node = test;
					$scope.comments = test.comments;
					$scope.photos = test.photos;

					break;
				}
			}

			$scope.$apply();
		};

		$scope.treeEvents = {
			'select_node': $scope.selectNode
		};

		$scope.treeConfig = {
			'plugins': ['types', 'dnd'],
			'types': {
				'default': {
					'icon': 'fa fa-fw fa-folder'
				},
				'machine-general-test': {
					'icon': 'fa fa-fw fa-wrench'
				},
				'wear-test': {
					'icon': 'fa fa-fw fa-shield'
				},
				'oil-test': {
					'icon': 'fa fa-fw fa-tint'
				},
				'photo': {
					'icon': 'fa fa-fw fa-camera'
				},
				'comment': {
					'icon': 'fa fa-fw fa-quote-right'
				}
			}
		};

		LayoutService.getPageHeader().onClicked(function () {
			$state.go('domainExpert-inspections-report', { id: $scope.inspectionId })
		});
	}]);