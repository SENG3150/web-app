angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerView', ['$scope', 'Inspections', 'moment', '$stateParams', 'LayoutService', 'toastr', 'Comments', 'AuthService', function ($scope, Inspections, moment, $stateParams, LayoutService, toastr, Comments, AuthService) {
		$scope.inspectionId = $stateParams.id;

		LayoutService.reset();
		LayoutService.setTitle(['Inspection ' + $scope.inspectionId, 'Inspections']);
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
				route: 'domainExpert-inspections-view({ id: ' + $scope.inspectionId + ' })',
				displayName: 'Inspection ' + $scope.inspectionId
			}
		]);

		$scope.inspection = Inspections.one($scope.inspectionId).get({
			include: 'majorAssemblies.majorAssembly,majorAssemblies.subAssemblies.subAssembly.tests'
		}).$object;
		
		$scope.moment = moment;
		$scope.commentData = {
			author: {}
		};

		$scope.submitComment = function() {
			var user = AuthService.getUser();

			//add the user data to the comment
			$scope.commentData.type = user.type;
			$scope.commentData.author.email = user.primary.email;
			$scope.commentData.author.name = user.primary.name;
			$scope.commentData.author.firstName = user.primary.firstName;
			$scope.commentData.author.lastName = user.primary.lastName;
			$scope.commentData.author.temporary = user.temporary || false;

			console.log($scope.commentData);
			// save the comment. pass in comment data from the form
			// use the function we created in our service
			Comments.save($scope.commentData);
		};

		$scope.save = function() {
			toastr.info('Save not currently available.');
		};

		LayoutService.getPageHeader().onClicked($scope.save);
	}]);