angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerView', ['$scope', 'Inspections', 'moment', '$stateParams', 'LayoutService', 'toastr', '$auth', '$state', 'AuthService', 'Comments', function ($scope, Inspections, moment, $stateParams, LayoutService, toastr, $auth, $state, AuthService, Comments) {
		$scope.inspectionId = $stateParams.id;
		$scope.loading = true;

		$scope.moment = moment;
		$scope.token = $auth.getToken();

		$scope.comment = '';
		$scope.nodeParts = [];
		$scope.selectedNodeId = '';
		$scope.treeInstance = {};

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
			include: 'technician,scheduler,machine.model,majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly'
		}).then(
			function (data) {
				$scope.loading = false;

				$scope.inspection = data;

				$scope.buildTree('root');
				$scope.parseNode('root');
			}
		);

		$scope.addComment = function () {
			if ($scope.comment != '') {
				var comment = {
					domainExpert: AuthService.getUser().primary.id,
					text: $scope.comment,
					timeCommented: moment().format()
				};

				switch ($scope.type) {
					case 'inspection':
					{
						comment.inspection = $scope.node.id;

						break;
					}

					case 'majorAssembly':
					{
						comment.majorAssembly = $scope.node.id;

						break;
					}

					case 'subAssembly':
					{
						comment.subAssembly = $scope.node.id;

						break;
					}

					case 'test-machineGeneral':
					{
						comment.machineGeneralTest = $scope.node.id;

						break;
					}

					case 'test-oil':
					{
						comment.oilTest = $scope.node.id;

						break;
					}

					case 'test-wear':
					{
						comment.wearTest = $scope.node.id;

						break;
					}
				}

				toastr.clear();
				toastr.info('Saving your comment...');

				Comments.save(comment).then(
					function () {
						toastr.clear();
						toastr.success('Your comment was saved successfully.');

						comment.author = AuthService.getUser().primary;

						$scope.node.comments.push(comment);

						// http://stackoverflow.com/a/17578861
						var recursiveFilter = function (item) {
							if (item.id == $scope.selectedNodeId) {
								return true;
							} else if (typeof item.children != 'undefined' && item.children.length > 0) {
								for (var i = 0; i < item.children.length; i++) {
									if (recursiveFilter(item.children[i]) == true) {
										return true;
									}
								}
							} else {
								return false;
							}
						};

						var selectedNode = _.find($scope.treeData, recursiveFilter);

						selectedNode.a_attr = {
							class: 'text-highlight'
						};

						$scope.buildTree($scope.selectedNodeId);

						angular.element(document.querySelector('#' + $scope.selectedNodeId + '_anchor')).addClass('text-highlight');

						$scope.dismiss();
					},
					function () {
						toastr.clear();
						toastr.error('There was an error while saving your comment.', 'Error');
					}
				)
			} else {
				toastr.clear();
				toastr.warning('You must enter a comment.');
			}
		};

		$scope.selectNode = function (node, selected) {
			$scope.parseNode(selected.node.id);
		};

		$scope.parseNode = function (node) {
			$scope.selectedNodeId = node;
			$scope.nodeParts = node.split('-');

			var majorAssembly = null;
			var subAssembly = null;
			var test = null;

			switch ($scope.nodeParts.length) {
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
						return item.id == parseInt($scope.nodeParts[1]);
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
						return item.id == parseInt($scope.nodeParts[1]);
					});

					subAssembly = _.find(majorAssembly.subAssemblies, function (item) {
						return item.id == parseInt($scope.nodeParts[2]);
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
						return item.id == parseInt($scope.nodeParts[1]);
					});

					subAssembly = _.find(majorAssembly.subAssemblies, function (item) {
						return item.id == parseInt($scope.nodeParts[2]);
					});

					switch ($scope.nodeParts[3]) {
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

		$scope.buildTree = function (selectedId) {
			var rootNode = {
				id: 'root',
				text: 'Inspection ' + $scope.inspectionId,
				children: [],
				state: {
					opened: true
				}
			};

			rootNode.state.selected = (rootNode.id == selectedId);

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

				majorAssemblyNode.state.selected = (majorAssemblyNode.id == selectedId);

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

					subAssemblyNode.state.selected = (subAssemblyNode.id == selectedId);

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

						machineGeneralTestNode.state.selected = (machineGeneralTestNode.id == selectedId);

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

						oilTestNode.state.selected = (oilTestNode.id == selectedId);

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

						wearTestNode.state.selected = (wearTestNode.id == selectedId);

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
		};

		$scope.treeEvents = {
			'select_node': $scope.selectNode
		};

		$scope.treeConfig = {
			core: {
				multiple: false
			},
			plugins: ['types', 'dnd'],
			types: {
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
			$state.go('domainExpert-inspections-report', {id: $scope.inspectionId})
		});
	}]);